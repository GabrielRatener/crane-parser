import {parse, ParsingTable, token} from './src/parser'
import Grammar from './src/grammar'
import {clr} from './src/generator'
import {Trie, SubSet} from './src/collections'

const tokens = [
	{ type: 'def',
	  range: [ 5, 8 ],
	  value: 'def',
	  source: '\n    def div(a, b) {\n        return a // b\n    }\n    \n    eq(div(8, 4), 2)\n',
	  loc: { start: { line: 2, column: 4 }, end: { line: 2, column: 7 } } },
	{ type: 'def',
	  range: [ 5, 8 ],
	  value: 'def',
	  source: '\n    def div(a, b) {\n        return a // b\n    }\n    \n    eq(div(8, 4), 2)\n',
	  loc: { start: { line: 2, column: 4 }, end: { line: 2, column: 7 } } },
	{ type: 'def',
	  range: [ 5, 8 ],
	  value: 'def',
	  source: '\n    def div(a, b) {\n        return a // b\n    }\n    \n    eq(div(8, 4), 2)\n',
	  loc: { start: { line: 2, column: 4 }, end: { line: 2, column: 7 } } }
];

const rawGrammar = [
    [
        "$$$",
        [
            "module"
        ]
    ],
    [
        "$__1",
        []
    ],
    [
        "$__1",
        [
            "statement"
        ]
    ],
    [
        "$__1",
        [
            "$__1",
            "sep",
            "statement"
        ]
    ],
    [
        "module",
        [
            "$__1"
        ]
    ],
    [
        "identifier",
        [
            "id"
        ]
    ],
    [
        "literal",
        [
            "null"
        ]
    ],
    [
        "literal",
        [
            "undefined"
        ]
    ],
    [
        "literal",
        [
            "true"
        ]
    ],
    [
        "literal",
        [
            "false"
        ]
    ],
    [
        "literal",
        [
            "number"
        ]
    ],
    [
        "literal",
        [
            "string"
        ]
    ],
    [
        "sep",
        [
            ","
        ]
    ],
    [
        "sep",
        [
            "nl"
        ]
    ],
    [
        "member-access",
        [
            "e",
            ".",
            "identifier"
        ]
    ],
    [
        "member-access",
        [
            "this",
            "identifier"
        ]
    ],
    [
        "member-access",
        [
            "e",
            "[",
            "e",
            "]"
        ]
    ],
    [
        "e",
        [
            "e",
            "scalar",
            "e"
        ]
    ],
    [
        "e",
        [
            "e",
            "linear",
            "e"
        ]
    ],
    [
        "e",
        [
            "e",
            "pow",
            "e"
        ]
    ],
    [
        "e",
        [
            "e",
            "logical",
            "e"
        ]
    ],
    [
        "e",
        [
            "e",
            "compare",
            "e"
        ]
    ],
    [
        "e",
        [
            "linear",
            "e"
        ]
    ],
    [
        "e",
        [
            "!",
            "e"
        ]
    ],
    [
        "e",
        [
            "not",
            "e"
        ]
    ],
    [
        "e",
        [
            "(",
            "e",
            ")"
        ]
    ],
    [
        "e",
        [
            "function"
        ]
    ],
    [
        "e",
        [
            "array"
        ]
    ],
    [
        "e",
        [
            "object"
        ]
    ],
    [
        "e",
        [
            "literal"
        ]
    ],
    [
        "e",
        [
            "identifier"
        ]
    ],
    [
        "e",
        [
            "member-access"
        ]
    ],
    [
        "$__2",
        []
    ],
    [
        "$__2",
        [
            "e"
        ]
    ],
    [
        "$__2",
        [
            "$__2",
            ",",
            "e"
        ]
    ],
    [
        "e",
        [
            "e",
            "(",
            "$__2",
            ")"
        ]
    ],
    [
        "e",
        [
            "this"
        ]
    ],
    [
        "$__3",
        []
    ],
    [
        "$__3",
        [
            "statement"
        ]
    ],
    [
        "$__3",
        [
            "$__3",
            "nl",
            "statement"
        ]
    ],
    [
        "block",
        [
            "{",
            "$__3",
            "}"
        ]
    ],
    [
        "$__4",
        []
    ],
    [
        "$__4",
        [
            "statement"
        ]
    ],
    [
        "$__4",
        [
            "$__4",
            "nl",
            "statement"
        ]
    ],
    [
        "block",
        [
            "indent",
            "$__4",
            "dedent"
        ]
    ],
    [
        "function",
        [
            "fn",
            "(",
            "params",
            ")",
            "body"
        ]
    ],
    [
        "function",
        [
            "fn",
            "(",
            "params",
            ")",
            "bound",
            "body"
        ]
    ],
    [
        "function",
        [
            "fn",
            "(",
            "params",
            ")",
            "type",
            "body"
        ]
    ],
    [
        "function",
        [
            "fn",
            "(",
            "params",
            ")",
            "bound",
            "type",
            "body"
        ]
    ],
    [
        "assignment-pattern",
        [
            "object-pattern"
        ]
    ],
    [
        "assignment-pattern",
        [
            "array-pattern"
        ]
    ],
    [
        "statement",
        [
            "return-statement"
        ]
    ],
    [
        "statement",
        [
            "blockable-statement"
        ]
    ],
    [
        "statement",
        [
            "declaration"
        ]
    ],
    [
        "statement",
        [
            "assignment-statement"
        ]
    ],
    [
        "statement",
        [
            "e"
        ]
    ],
    [
        "e.splat",
        [
            "...",
            "e"
        ]
    ],
    [
        "$__5",
        []
    ],
    [
        "$__5",
        [
            "e.array.component"
        ]
    ],
    [
        "$__5",
        [
            "$__5",
            "sep",
            "e.array.component"
        ]
    ],
    [
        "e.array",
        [
            "[",
            "$__5",
            "]"
        ]
    ],
    [
        "$__6",
        []
    ],
    [
        "$__6",
        [
            "e.object.property"
        ]
    ],
    [
        "$__6",
        [
            "$__6",
            "sep",
            "e.object.property"
        ]
    ],
    [
        "e.object",
        [
            "{",
            "$__6",
            "}"
        ]
    ],
    [
        "function.parameter",
        [
            "identifier"
        ]
    ],
    [
        "function.parameter",
        [
            "identifier",
            "=",
            "e"
        ]
    ],
    [
        "function.bound",
        [
            "->"
        ]
    ],
    [
        "function.bound",
        [
            "=>"
        ]
    ],
    [
        "function.type",
        [
            "*"
        ]
    ],
    [
        "function.type",
        [
            "~"
        ]
    ],
    [
        "function.type",
        [
            "~*"
        ]
    ],
    [
        "$__7",
        []
    ],
    [
        "$__7",
        [
            "function.parameter"
        ]
    ],
    [
        "$__7",
        [
            "$__7",
            ",",
            "function.parameter"
        ]
    ],
    [
        "function.params",
        [
            "$__7"
        ]
    ],
    [
        "function.body",
        [
            "block"
        ]
    ],
    [
        "$__8",
        []
    ],
    [
        "$__8",
        [
            "assignment-pattern.object-pattern.property"
        ]
    ],
    [
        "$__8",
        [
            "$__8",
            ",",
            "assignment-pattern.object-pattern.property"
        ]
    ],
    [
        "assignment-pattern.object-pattern",
        [
            "{",
            "$__8",
            "}"
        ]
    ],
    [
        "$__9",
        []
    ],
    [
        "$__9",
        [
            "assignment-pattern.array-pattern.component"
        ]
    ],
    [
        "$__9",
        [
            "$__9",
            ",",
            "assignment-pattern.array-pattern.component"
        ]
    ],
    [
        "assignment-pattern.array-pattern",
        [
            "[",
            "$__9",
            "]"
        ]
    ],
    [
        "statement.return-statement",
        [
            "return"
        ]
    ],
    [
        "statement.return-statement",
        [
            "return",
            "e"
        ]
    ],
    [
        "statement.blockable-statement",
        [
            "for-statement"
        ]
    ],
    [
        "statement.blockable-statement",
        [
            "while-statement"
        ]
    ],
    [
        "statement.blockable-statement",
        [
            "if-statement"
        ]
    ],
    [
        "statement.blockable-statement",
        [
            "try-statement"
        ]
    ],
    [
        "statement.blockable-statement",
        [
            "do-statement"
        ]
    ],
    [
        "statement.declaration",
        [
            "def",
            "declarators"
        ]
    ],
    [
        "statement.declaration",
        [
            "def",
            "identifier",
            "function"
        ]
    ],
    [
        "statement.assignment-statement",
        [
            "assignee",
            "=",
            "e"
        ]
    ],
    [
        "statement.assignment-statement",
        [
            "assign",
            "assignment-pattern",
            "=",
            "e"
        ]
    ],
    [
        "e.array.component",
        [
            "expression"
        ]
    ],
    [
        "e.object.property",
        [
            "identifier"
        ]
    ],
    [
        "e.object.property",
        [
            "identifier",
            ":",
            "e"
        ]
    ],
    [
        "e.object.property",
        [
            "identifier",
            "function"
        ]
    ],
    [
        "e.object.property",
        [
            "get",
            "identifier",
            "function"
        ]
    ],
    [
        "e.object.property",
        [
            "set",
            "identifier",
            "function"
        ]
    ],
    [
        "assignment-pattern.object-pattern.property",
        [
            "identifier",
            ":",
            "assignment-pattern"
        ]
    ],
    [
        "assignment-pattern.array-pattern.component",
        [
            "assignment-pattern"
        ]
    ],
    [
        "assignment-pattern.array-pattern.component",
        []
    ],
    [
        "statement.blockable-statement.blocky",
        [
            "blockable-statement"
        ]
    ],
    [
        "statement.blockable-statement.blocky",
        [
            "block"
        ]
    ],
    [
        "statement.blockable-statement.for-statement",
        [
            "for",
            "identifier",
            "in",
            "expression",
            "blocky"
        ]
    ],
    [
        "statement.blockable-statement.do-statement",
        [
            "do",
            "block"
        ]
    ],
    [
        "statement.blockable-statement.if-statement",
        [
            "if",
            "e",
            "blocky"
        ]
    ],
    [
        "statement.blockable-statement.if-statement",
        [
            "if",
            "e",
            "blocky",
            "else",
            "blocky"
        ]
    ],
    [
        "statement.blockable-statement.try-statement",
        [
            "try",
            "blocky",
            "catch-clause"
        ]
    ],
    [
        "statement.blockable-statement.try-statement",
        [
            "try",
            "blocky",
            "catch-clause",
            "finally",
            "blocky"
        ]
    ],
    [
        "statement.blockable-statement.try-statement",
        [
            "try",
            "blocky",
            "finally",
            "blocky"
        ]
    ],
    [
        "statement.declaration.declarator",
        [
            "identifier"
        ]
    ],
    [
        "statement.declaration.declarator",
        [
            "identifier",
            "=",
            "e"
        ]
    ],
    [
        "statement.declaration.declarator",
        [
            "identifier",
            ":=",
            "e"
        ]
    ],
    [
        "statement.declaration.declarators",
        [
            "declarator"
        ]
    ],
    [
        "statement.declaration.declarators",
        [
            "declarators",
            ",",
            "declarator"
        ]
    ],
    [
        "statement.assignment-statement.assignee",
        [
            "identifier"
        ]
    ],
    [
        "statement.assignment-statement.assignee",
        [
            "member-access"
        ]
    ],
    [
        "statement.blockable-statement.try-statement.catch-clause",
        [
            "catch",
            "identifier",
            "blocky"
        ]
    ]
];

const cooked = new Grammar(rawGrammar.map(([type, production]) => ({type, production})));
const table = clr(cooked, console);

//parse(table, tokens);

/*
rawGrammar.forEach(([type, production]) => {
	if (production.length === 0)
		console.log(`${type} -> ''`);
	else
		console.log(`${type} -> ${production.join(' ')}`);
});
*/