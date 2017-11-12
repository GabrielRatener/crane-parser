
/****************************
 * This parser is generated from the template/parser.template.js file
 * 
 *
 * **************************/

// if modifying this file and adding a new global variable, don't forget to modify the list of
// forbidden import names below to prevent import name collisions
//
// forbid: min, max, gotoStart, translations, productions, reducers
// forbid: lrTable, reduce, map, Locator, accepts, defaults, Parser


const {min, max} = Math;

// starting x index of goto part of table
const gotoStart = <%= gotoStart %>;

// translates token symbol type into numerical value
const translations = map(<%= translations %>); // {}

// sizes and non-terminals associated with productions
const productions = <%= productions %>;

const reducers = map(<%= reducers %>, parseInt);

/*
{
	action: Map {
		"3-8": '4'
	},
	goto: Map {
		"0-5": 's4'
		"2-9": 'r6'
		...
	}
}
*/

const lrTable = {
	action: map(<%= action %>),
	goto: map(<%= goto %>)
}

function map(obj, kFunc = (k) => k) {
	const mp = new Map();
	for(let key in obj)
		if (obj.hasOwnProperty(key))
			mp.set(kFunc(key), obj[key])
	return mp;
}

class Locator {
	constructor(positions, prev, rule) {
		const {start, end} = this.default(positions, prev, rule);
		
		this.start = start;
		this.end = end;
	}

	// compute with first and last only
	fast(positions, last) {
		switch (positions.length) {
			case 0:
				return {
					start: last,
					end: last
				};
			case 1:
				return positions[0];
			default:
				const first = positions[0];
				const last = positions[positions.length - 1];

				return {
					start: {
						line: first.start.line,
						column: first.start.column
					},
					end: {
						line: last.end.line,
						column: last.end.column
					}
				};
		}
	}

	// take running max/min using all positions
	slow(positions, last) {
		const loc = {
			start: {
				line: Infinity,
				column: Infinity
			},
			end: {
				line: 1,
				column: 0
			}
		}

		if (nodes.length === 0) {
			loc.start = loc.end = last;
		} else {
			let count = 0;
			for (let pos of positions) {
				if (pos) {
					if (pos.start.line <= loc.start.line) {
						loc.start.line = pos.start.line;
						loc.start.column = min(loc.start.column, pos.start.column);
					}

					if (pos.end.line >= loc.end.line) {
	                    loc.end.line = pos.end.line;
	                    loc.end.column = max(loc.end.column, pos.end.column);
					}

					count++;
				}
			}

			if (count === 0) {
				loc.start = loc.end = last;
			}
		}

		return loc;
	}



	default(...args) {
		return this.fast(...args);
	}
}

export function accepts(token) {
	return translations.has(token) && translations.get(token) < gotoStart;
}


export const defaults = {
}

export class Parser {
	constructor(source = "", context = {}, options = {}) {
		this.context = context;
		this.settings = Object.assign(options);
		this.source = "";

		// stacks
		this.states = [0]; // initially state 0		
		this.stack = [];
		this.values = [];
		this.positions = [];
		
		this.onreducestart = null;
		this.onreduceend = null;

		this.lastPosition = {
			row: 1,
			column: 0
		}

		for (let key in defaults) {
			if (defaults.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
				this.settings[key] = defaults[key];
			}
		}

		this.addSource(source);
	}

	showErr({row, column}, err) {
		const lines = this.source.split('\n');

		if (row <= lines.length && column < lines[row - 1].length) {
			const line = lines[row - 1];
			let ws = '';

			for (let c of line) {
				if (c === '\t') {
					ws += '\t';
				} else {
					ws += ' ';
				}
			}

			throw new Error(`${err.name}: ${err.message}\n\n${line}\n${ws}^\n`);
		} else {
			throw err;
		}
	}

	_state() {
		return this.states[this.states.length - 1];
	}

	_fire(eventType, data) {
		const fn = this[`on${eventType}`];
		const internal = true;

		if (typeof fn === 'function') {
			fn.apply(this, [data, internal]);
		}
	}

	_reduce(rule) {
		const [symbol, length] = productions[rule];
		const nodes = this.values.splice(-length);
		const positions = this.positions.splice(-length);
		const lastPosition = (positions.length === 0) ? null : positions[positions.length - 1];
		const loc = new Locator(positions, lastPosition, rule);

		this._fire('reducestart', {
			rule,
			nodes,
			positions,
			loc
		});

		if (reducers.has(rule)) {
			const fn = reducers.get(rule);
			this.values.push(fn.apply(this.context, [nodes, loc, rule]));
		} else {
			this.values.push(nodes.length > 0 ? args[0] : []);
		}

		this._fire('reduceend', {
			loc,
			rule,
			nodes,
			positions,
			node: this.values.length > 0 ?
				this.values[this.values.length - 1] :
				null
		});

		this.states.splice(-length);
		this.states.push(lrTable.goto.get(`${this._state()}-${symbol}`));
		this.stack.splice(-length);
		this.stack.push(symbol);
		this.positions.push(Object.assign(loc));
	}

	addSource(txt) {
		this.source += txt;
	}

	push(token) {
		if (token.type === '$')
			throw Error(`Unexpected token "$", always use "finish" to complete parsing`);

		if (!translations.has(token.type) || translations.get(token.type) >= gotoStart)
			this.showErr(new Error(`Invalid token type "${token.type}"`));
		else {
			const type = translations.get(token.type);

			while (true) {
				const key = `${this._state()}-${type}`;
				if (lrTable.action.has(key)) {
					const val = lrTable.action.get(key);
					const action = val[0];
					const number = parseInt(val.slice(1));

					if (action === 's') {
						this.states.push(number);
						this.stack.push(type);
						this.values.push(token.value == null ? token.string : token.value);
						this.positions.push(token.loc);

						this.lastPosition = token.loc.end;

						return;
					}

					if (action === 'r') {
						this._reduce(number);

						continue;
					}
				} else {
					this.showErr(token.loc, new Error(`Unexpected token "${token.type}"`));
				}
			}
		}
	}

	finish() {
		const type = translations.get('$');

		while (true) {
			const key = `${this._state()}-${type}`;
			if (lrTable.action.has(key)) {
				const val = lrTable.action.get(key);
				const action = val[0];
				const number = parseInt(val.slice(1));
				
				if (action !== 'r')
					throw new Error(`Unexpected shift action, expected reduce oraccept`);

				if (number === 0)
					return this.values[0];
				else {
					this._reduce(number);

					continue;
				}

			} else {
				throw new Error(`Unexpected end of imput`);
			}
		}
	}
}
