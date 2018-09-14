
import {tokenize as sanitize} from "./postprocess"
import {clr} from "../generator"
import {generate} from "../code-gen"
import Grammar from "../grammar"
import {compileLS} from "."

const precedence = [
];

const formalGrammar = [
	{
		type: 'Root',
		def: [
			{
				prod: 'Grammar',
				action: '$[0]'
			}
		]
	},
	{
		type: 'Grammar',
		def: [
			{
				prod: 'Body',
				action: '$[0]'
			},
			{
				prod: 'Body endl',
				action: '$[0]'
			}
		]
	},
	{
		type: 'Body',
		def: [
			{
				prod: 'BodyLine',
				action: '[$[0]]'
			},
			{
				prod: 'Body endl BodyLine',
				action: '$[0].concat $[2]'
			}
		]
	},
	{
		type: 'BodyLine',
		def: [
			{
				prod: 'Precedence',
				action: '$[0]'
			},
			{
				prod: 'Definition',
				action: '$[0]'
			}
		]
	},
	{
		type: 'String',
		def: [
			{
				prod: 'string',
				action: `if $[0][0] == '"' then $[0].slice 1, -1 else $[0].slice 1`
			}
		]
	},
	{
		type: 'Precedence',
		def: [
			{
				prod: 'ass String',
				action: `{type: $[0].slice 1, tokens: [$[1]]}`
			},
			{
				prod: 'Precedence String',
				action: `{type: $[0].type, tokens: [...$[0].tokens, $[1]]}`
			}
		],
	},
	{
		type: 'Definition',
		def: [
			{
				prod: `id : indent ProductionList dedent`,
				action: `{type: $[0], list: $[3]}`	
			}
		]
	},
	{
		type: 'ProductionList',
		def: [
			{
				prod: `Production`,
				action: `[$[0]]`
			},
			{
				prod: `ProductionList endl Production`,
				action: `[...$[0], $[2]]`
			}
		]
	},
	{
		type: 'Production',
		def: [
			{
				prod: `SymbolList`,
				action: `{production: $[0], code: null}`
			},
			{
				prod: `SymbolList code`,
				action: `{production: $[0], code: $[1]}`
			}
		]
	},
	{
		type: 'SymbolList',
		def: [
			{
				prod: `String`,
				action: `[$[0]]`
			},
			{
				prod: `id`,
				action: `[$[0]]`
			},
			{
				prod: `SymbolList String`,
				action: `[...$[0], $[1]]`
			},
			{
				prod: `SymbolList id`,
				action: `[...$[0], $[1]]`
			}
		]
	},
];

export const actions = new Map();

const inputGrammar = [];
let i = 0;

for (let {type, def} of formalGrammar) {
	for (let {prod, action} of def) {
		inputGrammar.push({type, production: prod.split(/\s+/)});
		actions.set(i, compileLS(action));
		i += 1;
	}
}

export const grammar = new Grammar(inputGrammar, 0, precedence);
