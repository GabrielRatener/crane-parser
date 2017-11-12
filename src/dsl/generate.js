
import {readFileSync, writeFileSync} from "fs"
import {sanitize} from "./postprocess"
import {grammar, actions} from "./bootstrap-grammar"
import {Parser} from "./parser.out"
import {sanitize} from "./postprocess"
import Grammar from "../grammar"
import {clr} from "../generator"
import {generate} from "../code-gen"
import {LEFT, RIGHT} from "../precedence"
import {compileLS} from "."

const [arg] = process.argv.slice(-1);

function getParserCode(ast) {
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

// bootstrap
if (arg === 'true') {
	const table = clr(grammar);

	writeFileSync('parser.out.js', generate(table, actions), 'utf8');

	process.exit();
}

try{
    if (/^[0-9]+$/.test(arg) || arg === 'false') {
        const parser = new Parser();
        const [i] = (arg === 'false' ? [0] : /^[0-9]+$/.exec(arg));
        const src = readFileSync(`${__dirname}/history/dsl.${parseInt(i) || 0}.grammar`, 'utf8');

        for (let token of sanitize(src)) {
            console.log(token.type, token.string);
            parser.push(token);
        }

        const ast = parser.finish();

        writeFileSync('parser.out.js', getParserCode(ast), 'utf8');

        process.exit();
    }
} catch (e) {
    console.log(e);
}

throw new Error('No arguments supplied!');
