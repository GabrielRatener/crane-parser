
import fs from "fs"
import path from "path"
import escodegen from "escodegen"
import babel from "babel-core"
import estemplate from "estemplate"
import treeTools from "esprima-ast-utils"
import * as js from "./js-nodes"

const dirname = path.dirname(new URL(import.meta.url).pathname);
const template = fs.readFileSync(dirname + '/parser.template.mjs', 'utf8');

function node(type, props) {
	const obj = {};

	for (let key in props) {
		obj[key] = props[key];
	}

	obj.type = type;

	return obj;
}

export function generate(lrTable, actions = new Map(), imports = []) {
	const {goto, action} = lrTable.indexMappers;
	const reducers = new js.ObjectExpression(props(actions, (o) => o));
    const forbidden = new Set();
    
	function props(map, fn = (e) => new js.Literal(e)) {
		const properties = [];
		for (let [key, val] of map) {
			properties.push(
				new js.Property(
					new js.Literal(key),
					fn(val)
					)
				);
		}

		return properties;
	}

    const validate = (name) => {
        if (forbidden.has(name)) {
            throw new Error(`Cannot overwrite name "${name}" with import!`);
        }
    }
    
	const [gotoAst, actionAst] = (({table}) => {
		const gotoProps = [], actionProps = [];
		for (let [y, x] of table) {
			const val = table.get(y, x);
			if (typeof val === "number")
				gotoProps.push(
					new js.Property(
						new js.Literal(`${y}-${x}`),
						new js.Literal(val)
						)
					);
			else
				actionProps.push(
					new js.Property(
						new js.Literal(`${y}-${x}`),
						new js.Literal(val.join(''))
						)
					);
		}

		return [
			new js.ObjectExpression(gotoProps),
			new js.ObjectExpression(actionProps)
		];
	})(lrTable);

	const params = {
		gotoStart: new js.Literal(action.size),
		goto: gotoAst,
		action: actionAst,
		translations: new js.ObjectExpression([...props(goto), ...props(action)]),
		productions: new js.ArrayExpression(
			lrTable.grammar.productions.map(
				([nt, p]) => new js.ArrayExpression([
					new js.Literal(goto.get(nt)),
					new js.Literal(p.length)
					]))),
		reducers
	}

	const gen = estemplate.compile(template, {
		sourceType: "module",
		comments: true,
		loc: true
	});
    
    const ast = gen(params);

    const declarations = [];
    
    for (let line of template.split('\n')) {
        const result = line.match(/^\s*\/\/\s*forbid\s*:(.*)$/);
        if (result != null) {
          result[1]
            .trim()
            .split(/\s*,\s*/)
            .forEach(name => forbidden.add(name));
        }
    }

    for (let pack of imports) {
        const {path, dependencies = []} = pack;
        const specifiers = [];
        
        if (pack.all != null) {
            validate(pack.all);
            specifiers.push(new js.ImportNamespaceSpecifier(new js.Identifier(pack.all)));
        }
        
        if (pack.default != null) {
            validate(pack.default);
            specifiers.push(new js.ImportDefaultSpecifier(new js.Identifier(pack.default)));
        }
        
        for (let {imported, local = imported} of dependencies) {
            validate(local);
            specifiers.push(new js.ImportSpecifier(
                new js.Identifier(local),
                new js.Identifier(imported)
            ));
        }
        
        declarations.push(new js.ImportDeclaration(specifiers, new js.Literal(pack.path)));
    }
    
    ast.body = [...declarations, ...ast.body];

	return escodegen.generate(ast, {
		comment: true
	});
}

