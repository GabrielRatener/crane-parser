
const {freeze} = Object;

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

export default function parserFactory(table, reducer) {
	const reducerFunction = (() => {
		if (typeof reducer === 'function')
			return reducer;
		else if (reducer.constructor.name === 'Map')
			return mapToFunction(reducer);
		else {
			const map = new Map;

			for (const key in reducer) {
				if (reducer.hasOwnProperty(key)) {
					map.set(parseInt(key, 10), reducer[key]);
				}
			}

			return mapToFunction(map);
		}
	})();

	return class Parser {
		constructor(options = {}) {
			const {
				context = {},
				tokenTranslator = ((token) => token.value)
			} = options;

			this.context = context;
			this.tokenTranslator = tokenTranslator;

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
				const {start} = positions[0];
				const {end} = positions[positions.length - 1];

				return freeze({start, end});
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
			const [symbol, {length}] = table.grammar.productions[rule];
			const nodes = this.values.splice(-length || this.values.length);
			const positions = this.positions.splice(-length || this.positions.length);
			const loc = this._locate(positions);

			this._fire('reducestart', {
				rule,
				nodes,
				positions,
				loc
			});

			this.values.push(reducerFunction({
				nodes,
				loc,
				rule,
				context: this.context
			}))

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
			this.states.push(table.get(this._state(), symbol, true));
			this.stack.splice(-length || this.stack.length);
			this.stack.push(symbol);
			this.positions.push(loc);
		}

		addSource(txt) {
			this.source += txt;
		}

		push(token, logger = null) {
			if (!table.grammar.terminals.has(token.type))
				throw new InvalidTokenError(this, token);
			else {
				while (true) {
					if (table.exists(this._state(), token.type)) {
						const [action, number] = table.get(this._state(), token.type);

						if (action === 's') {
							const loc = this._locateToken(token);

							this.states.push(number);
							this.stack.push(token.type);
							this.values.push(this.tokenTranslator(token));
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
			const end = '$';

			while (true) {
				if (table.exists(this._state(), end)) {
					const [action, number] = table.get(this._state(), end);
					
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
}

export const mapToFunction = (map, fallback = (($) => ($.length > 0) ? $[0] : [])) => {
	return ({context, nodes, loc, rule}) => {
		const args = [nodes, loc, rule];

		if (map.has(rule)) {
			const fn = map.get(rule);
			return fn.apply(context, args);
		} else {
			return fallback.apply(context, args);
		}
	} 
}
