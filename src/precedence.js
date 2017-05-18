
import {SparseTable} from "./collections"

export const LEFT = 0, RIGHT = 1;

// the precedence table can be used to resolve shift/reduce conflicts
// either by adding operator/token precedence rules. Or explicitly, by
// assigning precedence to specific rules with aliases
export class PrecedenceTable {
	constructor(levels = []) {

		this.levels = [LEFT]; // for default level 0 always reduce
		this.byToken = new Map;	// for looking up operators
		this.byAlias = new Map;	// for looking up precedence by alias

		for (let {direction, tokens, alias} of levels) {
			let level = this.levels.length;
			this.levels.push(direction);
			for (let token of tokens) {
				if (this.byToken.has(token)) {
					throw new Error('Token already has set precedence!');
				} else {
					this.byToken.set(token, level);
				}
			}

			if (alias) {
				if (this.byAlias.has(alias)) {
					throw new Error('Alias already has set precedence!');
				} else {
					this.byAlias.set(alias, level);
				}
			}
		}
	}

	getPrecedence(token) {
		if (this.byToken.has(token))
			return this.byToken.get(token);
		else
			return 0; // default to level 0
	}

	hasPrecedence(token) {
		return this.byToken.has(token);
	}

	// extract the precedence by looking at terminals in
	// a production p of a given grammar
	extractPrecedence(grammar, p) {
		const [nt, symbols] = grammar.productions[p];
		let max = 0;
		for (let symbol of symbols) {
			if (!grammar.terminals.has(symbol))
				continue;
			if (this.byToken.has(symbol) && this.byToken.get(symbol) > max)
				max = this.byToken.get(symbol);
		}

		return max;
	}

	// returns true if, given the left and right operators, one must shift
	shift(left, right) {
		const lPrec = this.getPrecedence(left);
		const rPrec = this.getPrecedence(right);

		if (lPrec < rPrec)
			return true;

		if (lPrec > rPrec)
			return false;

		return !!this.levels[lPrec];
	}

	// opposite of shift()
	reduce(left, right) {
		return !this.shift(left, right);
	}
}