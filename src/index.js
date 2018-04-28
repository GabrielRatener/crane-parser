
import {compile} from "./dsl"
import {generate as makeCode} from "./code-gen"
import {clr as table} from "./generator"

export {default as Grammar, EOF, EPS} from "./grammar"
export {ParsingTable, parse, token as tokenify} from "./parser"
export {default as Lexer} from "./dsl/lexer"
export {table};

// compile a string of crane grammar to a JS parser
export default function generate(code, options) {
	const {rootName, context = {}, debug = false, logger = console} = options;
    const {actions, grammar, dependencies} = compile(code, rootName, context);
    const map = new Map(Object.entries(actions).map(([k, v]) => [parseInt(k), v]));
    const parseTable = table(grammar, debug ? logger : null);

    if (debug) {
    	grammar.print(false, logger);
   		parseTable.print(8, logger);
	}
    
    return makeCode(parseTable, map, dependencies);
}