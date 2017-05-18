
import {Queue, SubSet} from "./collections"
import {PrecedenceTable} from "./precedence"

export const EOF = '$', EPS = '';

export default class Grammar {
	constructor(productions = [], root = 0, precedence = []) {

		// all properties and their objects should be considered read-only
		// all modifications should only be made with the methods below
		this.root = null;
		this.productions = [];
		this.precedence = new PrecedenceTable(precedence);
		this.terminals = new Set([EOF]);
		this.nonTerminals = new Map(); // NT -> list of production indexes
		this.presenceFinder = new Map(); // maps symbol to list of productions where present
		this._caches = {}; // for optimization

		for (let [nonTerminal, production] of productions) {
			this.addProduction(nonTerminal, production);
		}

		this.setRoot(0);
	}

	extractPrecedence(p) {
		return this
			.precedence
			.extractPrecedence(this, p);
	}

	setRoot(n) {
		const [nonTerminal, production] = this.productions[n];

		if (production.length === 1 &&
			this.nonTerminals.get(nonTerminal).length === 1)

			this.root = n;
		else
			throw new Error(`Root must have single production of length 1`);
	}

	// add production for non-terminal to grammar
	addProduction(nonTerminal, production) {
		const id = this.productions.length;

		if (!this.nonTerminals.has(nonTerminal)) {
			this.nonTerminals.set(nonTerminal, []);
			this.terminals.delete(nonTerminal);
		}

		for (let symbol of production) {
			if (!this.presenceFinder.has(symbol)) {
				this.presenceFinder.set(symbol, []);
			}

			this.presenceFinder
				.get(symbol)
				.push(id);

			if (!this.nonTerminals.has(symbol)) {
				this.terminals.add(symbol);
			}
		}

		this.productions.push([nonTerminal, production]);
		this.nonTerminals
			.get(nonTerminal)
			.push(this.productions.length -  1);
		return id;
	}

	* getProductions(nonTerminal) {
		for (let index of this.nonTerminals.get(nonTerminal)) {
			//console.log(index);
			const [,production] = this.productions[index];
			yield production;
		}
	}

	* _first(symbol, seen = new Set()) {
		if (seen.has(symbol))
			return;
		else
			seen.add(symbol);

		if (this.terminals.has(symbol)) {
			yield symbol;
		} else {
			for (let production of this.getProductions(symbol)) {
				if (production.length > 0) {
					for (let s of production) {
						yield* this._first(s, seen);

						if (!this.isNullable([s])) {
							break;
						}
					}
				}

				// if the symbol has a null or nullable production
				// add eps
				if (!seen.has(EPS)) {
					seen.add(EPS);
					yield EPS;
				}
			}
		}
	}

	// look no further, some really nasty code in there
	isNullable(symbols, _seen = new SubSet()) {
		outer:
		for (let symbol of symbols) {
			if (this.terminals.has(symbol))
				return false;
			else {
				const seen = _seen.sub();
				//console.log(symbol);
				inner:
				for (let production of this.getProductions(symbol)) {
					//console.log(production);
					if (production.length === 0)
						continue outer;
					else {
						for (let sym of production) {
							if (seen.has(sym))
								continue inner;
							else
								seen.add(sym);
							if (!this.isNullable([sym], seen)) {
								continue inner;
							}
						}

						continue outer;
					}
				}

				return false;
			}
		}

		return true;
	}

	* first(symbols, lookaheads = new Set) {
		const seen = new Set();
		for (let symbol of symbols) {
			yield* this._first(symbol, seen);

			if (!this.isNullable([symbol]))
				return;
		}

		for (let terminal of lookaheads) {
			if (!seen.has(terminal))
				yield terminal;
		}
	}

	// don't use yet, still workin on it...
	* follow(symbol, seen = new Set) {
		const [start] = this.productions[this.start];

		if (symbol === start && !seen.has(EOF)) {
			yield EOF;
			seen.add(EOF);
		}

		for (let index of this.presenceFinder.get(symbol)) {
			const [nt, production] = this.productions[index];
			for (let i = 0; i < production.length; i++) {
				if (production[i] === symbol) {
					if (i + 1 === production.length ||
						this.isNullable(production.slice(i + 1))) {

						yield* this.follow(nt, seen);
					}

					for (let terminal of this.first(production.slice(i + 1), seen)) {
						if (terminal !== EPS)
							yield terminal;
					}
				}
			}
		}
	}

	print(clump = true) {
		const [rootNode] = this.productions[this.root];
		if (clump) {
			for (let [nonTerminal, indexes] of this.nonTerminals) {
				console.log(
					nonTerminal,
					nonTerminal === rootNode ? '*' : '',
					'->'
					);
				for (let index of indexes) {
					const [,symbols] = this.productions[index];
					if (symbols.length === 0)
						console.log(`\t''`)
					else
						console.log(`\t${symbols.join(' ')}`);
				}
			}
		} else {
			for (let [nonTerminal, symbols] of this.productions) {
				console.log(
					nonTerminal,
					nonTerminal === rootNode ? '*' : '',
					"->",
					symbols.join(' ')
					);
			}
		}
	}
}