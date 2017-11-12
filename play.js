import {writeFileSync} from "fs"
import {parse, ParsingTable, token} from './src/parser'
import Grammar from './src/grammar'
import {clr} from './src/generator'
import {Trie, SubSet} from './src/collections'

import {RIGHT, LEFT} from './src/precedence'

import {StringSource} from './test/source'
import {getTokensFromSource} from './test/scanner'

import {generate} from "./src/code-gen"

const tuple = (...args) => Object.freeze(args);

const opTable = {
	'*': (a, b) => a * b,
	'/': (a, b) => a / b,
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'^': (a, b) => Math.pow(a, b)
}

const operation = (args) => {
	return {
		left: args[0],
		op: args[1],
		right: args[2]
	}
};

const unary = (args) => {
	return {
		operand: args[1],
		op: args[0]
	}
}

const lexer = {
	rules: [
		[/^[\+\-\*\\\^\(\)]$/],
		[/^[0-9]+$/, 'int']
	],
	* lex(input) {

		main:for (let tk of input.split(' ')) {
			for (let [rule, type = tk] of this.rules) {
				if (rule.test(tk)) {
					yield {type, value: tk};
					continue main;
				}
			}
		}
	}
}

const reducers = new Map([
	[1, `parseInt($[0])`],
	[2, `$[0] + $[2]`],
	[3, `$[0] - $[2]`],
	[4, `$[0] * $[2]`],
	[5, `$[0] / $[2]`],
	[6, `$[0] ^ $[2]`],
	[7, `$[1]`],
]);

const [productions, reduce] = (() => {
	const productions = [
		tuple('G', ['E']),
		tuple('E', ['int']),
		tuple('E', ['E', '+', 'E'], operation),
		tuple('E', ['E', '-', 'E'], operation),
		tuple('E', ['E', '*', 'E'], operation),
		tuple('E', ['E', '/', 'E'], operation),
		tuple('E', ['E', '^', 'E'], operation),
		tuple('E', ['(', 'E', ')'], (args) => args[1]),
	];

	return [
		productions.map(([nt, prod]) => tuple(nt, prod)),
		(p, args) => {
			const [,, fn = ((args) => args[0])] = productions[p];
			
			return fn(args);
		}
	];
})();

const precedence = [
	{direction: LEFT, tokens: ['+', '-']},
	{direction: LEFT, tokens: ['*', '/']},
	{direction: RIGHT, tokens: ['^']},
];

const prod = [
	tuple('G', ['S']),
	tuple('S', ['X', 'X']),
	tuple('X', ['a', 'X']),
	tuple('X', ['b'])
];

const grammar = new Grammar(productions, 0, precedence);

const
	table = clr(grammar);

console.log();
table.print();
console.log();

writeFileSync(`${__dirname}/gened.js`, generate(table, reducers), 'utf8');

process.exit();

function* tokenize(str) {
	const source = new StringSource(str);
	for (let {tag, value} of getTokensFromSource(source)) {
		if (grammar.terminals.has(tag))
			yield {type: tag, value};
	}
}

const tokens = Array.from(tokenize("123 + (33 + 505) ^ 7"));
const ast = parse(table, tokens, reduce);

console.log(JSON.stringify(ast, null, 4))
