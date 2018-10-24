
import {compile, toGrammar} from "./dsl"
import {generate as makeCode} from "./code-gen"
import {SRConflictError, RRConflictError, clr} from "./generator"

export {default as Grammar, EOF, EPS} from "./grammar"
export {ParsingTable, parse, token as tokenify} from "./parser"
export {compile, toGrammar};
export {default as Lexer} from "lexie"
export {clr as generateParsingTable};
export {default as parserFactory} from "./parser-factory"

const pad = (e, n) => ('' + e).padEnd(n, ' ');

// compile a string of crane grammar to a JS parser
export default function generate(code, options) {
	const {rootName, context = {}, debug = false, logger = console} = options;
    const {actions, grammar, dependencies, sourceLineMapping} =
    	compile(code, rootName, context);

    const map = new Map(Object.entries(actions).map(([k, v]) => [parseInt(k), v]));
    const parseTable = (() => {
    	try {
	    	return clr(grammar, debug ? logger : null);
    	} catch (e) {
			const lines = code.split('\n');
    		if (e instanceof RRConflictError) {
    			const [first, last] =
    			  [e.old, e.current]
                    .sort()
    				.map(val => grammar.productions[val])
                    .map(([nt, production]) => 
                      (production.length > 0) ?
                        `${nt} -> ${production.join(' ')}` :
                        `${nt} -> ''`);

    			let message = e.message;
    			message += "\n\n";
				message += `\t${first}\n`;
				message += `\t &\n`;
				message += `\t${last}\n`;

				throw new Error(message);
    		}

    		if (e instanceof SRConflictError) {
    			const [nt, production] = grammar.productions[e.production];

				let message = e.message;
    			message += "\n\n";
                if (production.length > 0)
                    message += `\t${nt} -> ${production.join(' ')}\n`;
                else
                    message += `\t${nt} -> ''`;
    			message += `\t ^\n`;

    			throw new Error(message);
       		}

    		throw e;
    	}
    })();

    if (debug) {
    	grammar.print(false, logger);
   		parseTable.print(8, logger);
	}

    return makeCode(parseTable, map, dependencies);
}

export function read(code, options) {
    const {rootName, context = {}} = options;

    return compile(code, rootName, context);
}
