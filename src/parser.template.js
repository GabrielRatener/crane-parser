
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
const {freeze} = Object;

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

export function untranslate(n) {
	for (const [key, value] of translations) {
		if (value === n)
			return key;
	}
}

export function accepts(token) {
	return translations.has(token) && translations.get(token) < gotoStart;
}


export const defaults = {
}

class ParsingError extends Error {
	constructor(parsing, message = '') {
		super();

		const [type] = this.constructor.name.split('$');

		this.type = type;
		this.message = `${this.type}: ${message}`;
		this.parsing = parsing;
		this.loc = parsing.lastPosition;
	}
}

class UnexpectedTokenError extends ParsingError {
	constructor(parsing, token, message = `Unexpected "${token.type}" token`) {
		super(parsing, message);
		this.loc = parsing._locateToken(token);
		this.token = token;
	}
}

class UnexpectedEndError extends ParsingError {
	constructor(parsing, message = "Encountered EOF but expected more tokens") {
		super(parsing, message);
	}
}

class InvalidTokenError extends UnexpectedTokenError {
	constructor(parsing, token, message = `Invalid token type: "${token.type}"`) {
		super(parsing, token, message);
	}
}

export class Parser {
	constructor({context = {}} = {}) {
		this.context = context;

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
		};

		this.settings = {
			locate: false
		};
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

	_locate(positions) {
		if (positions.length === 0) {
			return freeze({
				start: this.lastPosition,
				end: this.lastPosition
			});
		} else {
			return freeze({
				start: positions[0],
				end: positions[positions.length - 1]
			});
		}
	}

	_locateToken(token) {
		if (token.loc == null) {
			return freeze({
				start: this.lastPosition,
				end: this.lastPosition
			});
		} else {
			return token.loc;
		}
	}

	_reduce(rule) {;
		const [symbol, length] = productions[rule];
		const nodes = this.values.splice(-length || this.values.length);
		const positions = this.positions.splice(-length || this.positions.length);
		const loc = this._locate(positions);

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
			this.values.push(nodes.length > 0 ? nodes[0] : []);
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

		this.states.splice(-length || this.states.length);
		this.states.push(lrTable.goto.get(`${this._state()}-${symbol}`));
		this.stack.splice(-length || this.stack.length);
		this.stack.push(symbol);
		this.positions.push(loc);
	}

	addSource(txt) {
		this.source += txt;
	}

	push(token, logger = null) {
		if (!translations.has(token.type) || translations.get(token.type) >= gotoStart)
			throw new InvalidTokenError(this, token);
		else {
			const type = translations.get(token.type);

			while (true) {
				const key = `${this._state()}-${type}`;

				if (lrTable.action.has(key)) {
					const val = lrTable.action.get(key);
					const action = val[0];
					const number = parseInt(val.slice(1));

					if (action === 's') {
						const loc = this._locateToken(token);

						this.states.push(number);
						this.stack.push(type);
						this.values.push(token.value);
						this.positions.push(loc);
						this.lastPosition = loc.end;

						return;
					}

					if (action === 'r') {
						this._reduce(number);

						continue;
					}
				} else {
					throw new UnexpectedTokenError(this, token);
				}
			}
		}
	}

	finish(logger = null) {
		const type = translations.get('$');

		while (true) {
			const key = `${this._state()}-${type}`;
			if (lrTable.action.has(key)) {
				const val = lrTable.action.get(key);
				const action = val[0];
				const number = parseInt(val.slice(1));
				
				if (action !== 'r')
					throw new UnexpectedEndError(this);

				if (number === 0)
					return this.values[0];
				else {
					this._reduce(number);

					continue;
				}

			} else {
				throw new UnexpectedEndError(this);
			}
		}
	}
}
