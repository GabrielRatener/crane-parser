
import {compile} from "./dsl"
import {generate as makeCode} from "./code-gen"
import {clr as table} from "./generator"

export {default as Grammar, EOF, EPS} from "./grammar"
export {ParsingTable, parse, token as tokenify} from "./parser"
export {default as Lexer} from "./dsl/lexer"
export {table};

// compile a string of crane grammar to a JS parser
export default function generate(code, rootName, context = {}) {
    const {actions, grammar, dependencies} = compile(code, rootName, context);
    const map = new Map(Object.entries(actions).map(([k, v]) => [parseInt(k), v]));
    
    return makeCode(table(grammar), map, dependencies);
}