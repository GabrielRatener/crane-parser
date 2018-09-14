
import fs from "fs"
import vm from "vm"
import {tokenize} from "./postprocess"
import {grammar, actions} from "./bootstrap-grammar"
import Grammar from "../grammar"
import {clr} from "../generator"
import {generate} from "../code-gen"
import babel from "babel-core"
import {LEFT, RIGHT} from "../precedence"
import {compileLS, toGrammar, extractor} from "."

const dir = process.cwd();
const [file] = process.argv.slice(-1);

const getParserCode = (ast) => {
	const actions = new Map();
	const grammar = [];
	const precedence = [];
	for (let {type, list} of ast) {

		for (let {production, code} of list) {
            if (code)
                actions.set(grammar.length, compileLS(code));
			grammar.push({type, production});
		}
	}

	return generate(clr(new Grammar(grammar, 0, precedence)), actions);
}

const toMap = (obj, transformer = (k) => parseInt(k, 10)) => {
    const map = new Map();

    for (const key in obj) {
        map.set(transformer(key), obj[key]);
    }

    return map;
}

const getBaseParser = () => generateParser(grammar, actions);

const generateParser = (grammar, actions) => {
    const table = clr(grammar);
    const source = generate(table, actions);
    const {code} = babel.transform(source, {
        plugins: ["transform-es2015-modules-commonjs"]
    });

    const context = {
        console,
        exports: {}
    };

    const {accepts, Parser} = (vm.runInNewContext(code, context), context['exports']);

    return {source, accepts, Parser};
}

const basic = (ast) => {
    const grammarList = [], actions = {};
    for (let {type, list} of ast) {
        for (const {production, code, prec} of list) {
            if (code)
                actions[grammarList.length] = compileLS(code);
            grammarList.push({type, production, prec});
        }
    }

    return {
        actions,
        grammar: new Grammar(grammarList)
    };
}

const getParser = (index, {accepts, Parser} = getBaseParser()) => {
    const transformer = (index === 0) ? basic : toGrammar;
    const context = {
        node: new Proxy({}, {
            get(_, type) {
                return (obj) => ({
                    type,
                    loc,
                    ...obj
                });
            },
            apply(_, ctxt, [obj]) {
                return {
                    loc,
                    ...obj
                }
            }
        })
    }

    const source = fs.readFileSync(`${dir}/history/dsl.${index}.grammar`, 'utf8');
    const parser = new Parser({context});

    let loc = null;

    parser.onreducestart = (data) => {
        loc = data.loc;
    }

    for (const token of tokenize(source)) {
        parser.push(token);
    }

    const ast = parser.finish();
    const {grammar, actions} = transformer(ast);
    
    return generateParser(grammar, toMap(actions));
}

const {source} = getParser(0);

if (file.endsWith('.mjs'))
    fs.writeFileSync(`${dir}/${file}`, source);
