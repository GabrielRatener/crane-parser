
import {generate} from './dep/escodegen';
import {Parser} from './generated-parser';
import {tokenizeCharSrc, refineTokens} from './lexer';
import {Lines} from './errors';
import {StringSource} from './source';
import * as nodes from './bz-nodes';
import {ParserAPI} from './parser-interface';

// returns a ParserAPI as defined in parser-interface.js
function control(tokens, parameters) {
	let psr = getParser(parameters);
	let tree = null;
	let jstree = null;
	return {
		get tree() {
			if (tree === null) {
				tree = psr.parse(tokens, parameters.source, parameters.file);
				tree.parameters = parameters;
			}

			return tree;
		},
		getJSTree(o) {
			return (jstree || (jstree = this.tree.toJS(o || {})));
		},
		getJSText(o) {
			const parsed = this.getJSTree(o);
			return generate(parsed);
		}
	}
}

{
	let gkey = Symbol('generator');
	Parser.prototype.lexer = {
		lex: function() {
			var next = this[gkey].next();
			if (next.done) {
				return null;
			} else {
				let token		= next.value;
				let position 	= token.getPosition();
				this.yytext 	= token;
			    this.yyloc 		= position;
			    this.yylloc 	= position;
			    this.yylineno 	= position.first_line;
				return token.tag;
			}
		},
		setInput: function(tokens, csrc, file) {
			this.source = csrc;
			this.filename = file;
			this[gkey] = tokens;
		},
		upcomingInput: function() {
		    return null;
		}
	};
}



function getParser(params) {
	let psr = new Parser();
	psr.yy = nodes;
	psr.yy.parseError = function(message, ob) {
		if (params.throwSyntax) {
			throw new Error("Parse Error!");
		} else {
			const lines = new Lines(params.source, 4);
			const x		= ob.loc.last_column;
			const y		= ob.loc.last_line;
			lines.error(`Unexpected token "${ob.token}"`, [x, y]);
		}
	}
	return psr;
}

export function parse(string, parameters = {}) {
	return parseString(string, parameters);
}

export function parseString(string, parameters) {
	let csrc = new StringSource(string);
	return parseCharSrc(csrc, parameters);
}


export function parseCharSrc(csrc, parameters) {
	let gen = tokenizeCharSrc(csrc);
	parameters.source = csrc;
	return control(gen, parameters);
}


export function parseRawTokens(tokens, parameters) {
	let gen = refineTokens(tokens[Symbol.iterator]());
	return control(gen, parameters);
}


export function parseTokens(tokens, parameters) {
	return control(tokens, parameters);
}
