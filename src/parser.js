
import {SparseTable} from "./collections";

const {max} = Math;

export class ParsingTable {
	/*
	Generic parsing table for *LR grammars.
	All modifications to the table should be done through newRow, and the row
	construction API. Otherwise the table should be considered read-only.
	*/

	// first argument is an LR grammar
	// which initializes the columns
	constructor(grammar) {
		const gotoIndex = grammar.terminals.size;
		const width = gotoIndex + grammar.nonTerminals.size;
		let index = 0;
		this._id = 1;
		this.rowMap = new Map();
		this.grammar = grammar;
		this.table = new SparseTable(width, 0);
		this.gotoIndex = gotoIndex; // offset of GOTO section of table
		this.indexMappers = { // maps symbols to their column offsets in table
			action: new Map(),
			goto: new Map()
		};

		for (let terminal of grammar.terminals) {
			this.indexMappers.action.set(terminal, index);
			index++;
		}

		for (let [nonTerminal] of grammar.nonTerminals) {
			this.indexMappers.goto.set(nonTerminal, index);
			index++;
		}
	}

	// false means action
	_getIndexMapper(mode = false) {
		const {action, goto} = this.indexMappers;
		return (mode) ? goto : action;
	}

	// convert index, symbol, goto triple into (y, x) coordinates for sparse table
	convert(index, symbol, goto = false) {
		let mapper = this._getIndexMapper(goto);

		if (mapper.has(symbol)) {
			return [index, mapper.get(symbol)];
		} else {
			throw new Error(`Symbol "${symbol}" does not exist`);
		}
	}

	print(tabsize = 4) {
		const term = Array.from(this.indexMappers.action);
		const nonterm = Array.from(this.indexMappers.goto);
		const tabulate = (value = '', length = 4) => {
			if (value.length > length)
				throw new Error('Too long to tabulate!')
			const str = "" + value;
			return `${" ".repeat(length - value.length)}${value}`;			
		};

		console.log(
			tabulate('', tabsize),
			'|',
			term
				.map(([e]) => tabulate(e, tabsize))
				.join(''),
			'|',
			nonterm
				.map(([e]) => tabulate(e, tabsize))
				.join('')
			);

		for (let i = 0; i < this.length; i++) {
			console.log(
				tabulate(i, tabsize),
				'|',
				term
					.map(([e]) => {
						return this.get(i, e);
					})
					.map(e => {
						// e is either [action, number] pair or undefined
						if (e) {
							const [type, num] = e;
							if (type === 'a')
								return tabulate("acc", tabsize);
							else
								return tabulate(`${type}${num}`, tabsize);
						} else
							return tabulate('', tabsize);
					})
					.join(''),
				'|',
				nonterm
					.map(([e]) => this.get(i, e, true))
					.map(e => {
						if (e === undefined)
							return tabulate('', tabsize);
						else
							return tabulate(e, tabsize);
					})
					.join('')
				)
		}
	}

	exists(y, symbol, goto = false) {
		const mapper = this._getIndexMapper(goto);

		if (mapper.has(symbol)) {
			const x = mapper.get(symbol);
			return this.table.get(y, x) !== undefined;
		} else {
			throw new Error('No entry in LR Table');
		}
	}
	
	get(y, symbol, goto = false) {
		const mapper = this._getIndexMapper(goto);
		if (mapper.has(symbol)) {
			const x = mapper.get(symbol);
			return this.table.get(y, x);
		} else {
			throw new Error('No entry in LR Table');
		}
	}

	newRow(translator = (e) => e) {
		const values = new Map();
		const api = {
			set: (symbol, value, goto = false) => {
				const mapper = this._getIndexMapper(goto);
				if (mapper.has(symbol)) {
					values.set(mapper.get(symbol), value);
				}
			},

			get: (symbol, goto = false) => {
				const mapper = this._getIndexMapper(goto);
				if (mapper.has(symbol)) {
					return values.get(mapper.get(symbol));
				}
			},
			has: (symbol, goto = false) => {
				const mapper = this._getIndexMapper(goto);
				return mapper.has(symbol)
					&& values.has(mapper.get(symbol));
			},
			append: () => {
				const index = this.table.height;
				this.table.height++;
				for (let [col, value] of values) {
					this.table.set(index, col, translator(value));
				}

				return this.table.height - 1;
			}
		}

		return api;
	}

	getAction(index, root = false) {
		return (...args) => args.length === 1 ?
			args[0].value :
			args
				.map(({type, value}) => `(${type}: ${value})`)
				.join(' ');
	}

	get length() {
		return this.table.height;
	}
}

export function token(type, value = type) {
	return {type, value};
}

/*
Mainly for testing (use parser-generator for production)
`parse` takes in a ParsingTable an iterable of tokens, and
optionally a custom reducer function that returns a reduced group
of symbols. The first argument passed is the index of the reduction rule.
The second argument is the arguments being reduced
*/
export function parse(table, tokens, func = ((n, [e1]) => e1)) {
	const
		types = [],
		values = [],
		states = [0];
	const state = () => states[states.length - 1];
	const lookahead = (asToken = false) => {
		const val = (position < tokens.length) ?
			tokens[position] :
			token('$');

		if (asToken)
			return val;
		else
			return val.type;
	};

	let position = 0;

	while (true) {
		// make sure action exists for given cell
		if (table.exists(state(), lookahead())) {
			const [action, num] = table.get(state(), lookahead());
			// e.g. s3 => action == 's' num == 3
			if (action === 's') {
				const {type, value} = lookahead(true);
				types.push(type);
				values.push(value);
				states.push(num);
				position++;

				continue;
			}

			if (action === 'r') {
				const {type, value} = lookahead(true);
				const [nonTerminal, production] = table.grammar.productions[num];
				const args = values.splice(-production.length);
				const astValue = func(num, args);

				values.push(astValue);

				types.splice(-production.length);
				types.push(nonTerminal);

				states.splice(-production.length);
				if (state() === 0 && lookahead() === '$')
					return values[0];
				else {
					states.push(table.get(state(), nonTerminal, true));
					continue;
				}
			}

			// deprecated (use r0 for accept now)
			if (action === 'a') {
				if (values.length === 1 && position === tokens.length) {
					return values[0];
				} else {
					throw new Error("String incorrectly parsed");
				}
			}
		}

		// error messages
		throw new Error(`State ${state()} doesn't contain action for ${lookahead()}`);	
	}
}
