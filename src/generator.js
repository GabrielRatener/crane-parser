
import {Trie, Queue} from "./collections.js"
import {ParsingTable} from "./parser.js"
import {EOF, EPS} from "./grammar.js"
import {LEFT, RIGHT} from "./precedence.js"

const {floor} = Math;

const setIdTracker = () => ({
	_id: 0,
	_trie: new Trie(),
	getId(set) {
		const seq = Array.from(set);

		seq.sort();

		if (this._trie.has(seq)) {
			return this._trie.get(seq);
		} else {
			const id = this._id;
			this._id++;
			this._trie.set(seq, id);
			return id;
		}
	},
	getSet(id) {
		// patience is key ...
	}
});

const setify = function(iterable) {
	const s = new Set();
	for (let el of iterable) {
		if (el !== '')
			s.add(el);
	}

	return s;
}

export class RRConflictError extends Error {
	constructor(old, current) {
		super(`Reduce/reduce conflict between ${old} and ${current}.`);

		this.old = old;
		this.current = current;
	}
}

export class SRConflictError extends Error {
	constructor(production, lookahead) {
		super(`Shift/reduce conflict: reduce by rule ${production} or shift "${lookahead}".`);

		this.production = production;
		this.lookahead = lookahead;
	}
}

// all these functions take in a grammar and output a parsing table

// LR(1) generator
export function clr(grammar, logger = null) {
	function lookaheads(prev) {
		const [lastP, offset, set] = prev;
		const [nt, pro] = grammar.productions[lastP];
		const v = pro.slice(offset + 1);

		if (v.length === 0)
			return setify(set);
		else {
			const s = setify(grammar.first(v));

			if (grammar.isNullable(v))
				return new Set([...s, ...set]);
			else
				return s;
		}
	}

	function* closure(p, o, set, seen = new Set) {
		const hash = stringify(p, o, set);
		const [nt, production] = grammar.productions[p];
		
		if (seen.has(hash))
			return;
		else
			seen.add(hash);

		yield [p, o, set];
		if (o === production.length)
			return;
		else {
			const symbol = production[o];
			if (grammar.nonTerminals.has(symbol)) {

				for (let index of grammar.nonTerminals.get(symbol)) {
					const [,prod] = grammar.productions[index];
					const lahSet = lookaheads([p, o, set], [index, 0]);

					yield* closure(index, 0, lahSet, seen);
				}
			} else
				return;
		}
	}

	function* clozure(p, o, lahs) {
		if (grammar.productions[p][1].length === o) {
			yield [p, o, lahs];
		} else {
			const add = (p, o, lah) => {
				const hash = grammar.productions.length * o + p;
				if (!lahMap.has(hash)) {
					lahMap.set(hash, new Set());
				}

				seen.add(`${p}-${o}-${lah}`);

				if (lah === '')
					return;

				lahMap
				  .get(hash)
				  .add(lah);
				list.push([p, o, lah]);
			}

			const lahMap = new Map;
			const seen = new Set;
			const list = [];

			for (const lah of lahs) {
				add(p, o, lah);
			}

			while (true) {
				let done = true;

				for (const [p, o, lah] of list) {
					if (grammar.productions[p][1].length > 0) {
						const [,production] = grammar.productions[p];
						const [symbol, ...post] = production.slice(o);

						if (grammar.nonTerminals.has(symbol)) {

							for (const index of grammar.nonTerminals.get(symbol)) {
								try {
									for (const terminal of grammar.first([...post, lah])) {
										const hash = `${index}-0-${terminal}`;
										if (!seen.has(hash)) {
											done = false;
											add(index, 0, terminal);
										}
									}
								} catch (e) {
									console.log([...post, lah]);
									console.log(post, lah);
									throw e;
								}
							}
						}
					}
				}

				if (done) {
					break;
				}
			}

			for (const [hash, lahs] of lahMap) {
				const p = hash % grammar.productions.length;
				const o = floor(hash / grammar.productions.length);

				yield [p, o, lahs];
			}
		}
	}

	function item(itemees) {
		const table = new Map;
		const list = [];
		for (let [p, o, ls] of itemees) {

			for (let [pro, off, set] of clozure(p, o, ls)) {
				if (table.has(stringify(pro, off))) {
					const lahSet = table.get(stringify(pro, off));
					set.forEach(lah => lahSet.add(lah));
				} else {
					const lahSet = new Set(set);
					table.set(stringify(pro, off), lahSet);
					list.push([pro, off, lahSet]);
				}
			}
		}

		return list;
	}

	function translator(val) {

		if (typeof val === "string") {
			const [index] = rows.get(val);
			return index;
		}

		if (val[0] === 's') {
			const [index] = rows.get(val[1]);
			return ['s', index];
		}

		// default: don't translate id
		return val;
	}

	const stringify = (p, o, la) => !!la ? `${p}-${o}-${sids.getId(la)}` : `${p}-${o}`;
	const id = (p, o, la) => {
		let next = stringify(p, o, la), seen = new Set();
		while (forwarding.has(next)) {
			if (seen.has(next))
				throw new Error('ID Forwarding loop');
			else
				seen.add(next);
			next = forwarding.get(next);
		}

		return next;
	}

	const resolveSR = (prod, lookahead, row, params) => {
		const current = row.get(lookahead);
		const shift = params.shift || current;
		const reduce = params.reduce || current;
		const sPrec = grammar.precedence.getPrecedence(lookahead);
		const rPrec = grammar.precedence.extractPrecedence(grammar, prod);

		//logger.log('resolving...')
		//logger.log([prod, rPrec], [lookahead, sPrec])

		if (rPrec < sPrec) {
			row.set(lookahead, shift);
		} else if (rPrec > sPrec) {
			row.set(lookahead, reduce);
		} else {
			const associativity = grammar.precedence.levels[sPrec];
			if (associativity === LEFT) {
				row.set(lookahead, reduce);
			} else {
				row.set(lookahead, shift);
			}
			/*
			} else if (associativity === RIGHT) {
				row.set(lookahead, shift);
			} else {
				throw new SRConflictError(prod, lookahead);
			}
			*/
		}
	}

	// ensure there's a row for a given ID and return that row index
	const assertRowIndex = (productionIndex, offset, lookaheads) => {
		const stateId = stringify(productionIndex, offset, lookaheads);

		if (statesNumerator.has(stateId)) {
			return statesNumerator.get(stateId);
		} else {
			statesNumerator.set(stateId, rows.length);
			rows.push(table.newRow());
			return rows.length - 1;
		}
	}

	const sids = setIdTracker();

	// p = production, o = offset
	const table = new ParsingTable(grammar);
	const statesNumerator = new Map();

	const queue = new Queue();
	const seenStates = new Set;
	const rows = [];

	queue.enqueue([[grammar.root, 0, new Set('$')]]);

	while (queue.length > 0) {
		const states = queue.dequeue();
		const stateIndex = assertRowIndex(...states[0]);
		const row = rows[stateIndex];
		const nextMap = new Map();
		const listMap = new Map();
		const [pi, offset] = states[0];

		if (seenStates.has(stateIndex))
			continue;
		else
			seenStates.add(stateIndex);

		if (logger)
			logger.log(`\nstate (${stateIndex}):`);

		// TODO: fix that gnarly item function
		for (const [productionIndex, offset, lookaheads] of item(states)) {
			const [nonTerminal, production] = grammar.productions[productionIndex];

			if (logger)
				logger.log(
					'\t',
					nonTerminal,
					'->',
					production.slice(0, offset).join(' ') +
					'.' +
					production.slice(offset).join(' '),
					'\t|\t',
					lookaheads
					);


			if (offset === production.length) {
				// if we're at end of production we reduce

				const action = ['r', productionIndex];

				for (const lookahead of lookaheads) {
					if (row.has(lookahead)) {
						// if cell already has action we have a problem

						const [operation, n] = row.get(lookahead);

						if (operation === 'r') {
							if (n !== productionIndex)
								throw new RRConflictError(n, productionIndex);
						} else {
							// handle shift/reduce conflict
							resolveSR(productionIndex, lookahead, row, {reduce: action});
						}

					} else {
						row.set(lookahead, action);
					}
				}
			} else {
				const next = production[offset];
				const nextIndex =
				  nextMap.has(next) ?
				  	nextMap.get(next) :
					assertRowIndex(productionIndex, offset + 1, lookaheads);

				if (!listMap.has(next)) {
					listMap.set(next, []);
				}


				nextMap.set(next, nextIndex);

				if (grammar.terminals.has(next)) {
					// if terminal symbol is next

					const action = ['s', nextIndex];
					if (row.has(next)) {
						const [operation, n] = row.get(next);
						if (operation === 's') {
							row.set(next, action);
						} else {
							// resolve shift/reduce conflict
							resolveSR(n, next, row, {shift: action});
						}
					} else {
						row.set(next, action);
 					}
 				} else {
					// if non-terminal symbol is next

					row.set(next, nextIndex, true);
				}

				listMap
				  .get(next)
				  .push([productionIndex, offset + 1, lookaheads]);
			}
		}

		for (const [symbol, positionList] of listMap) {
			queue.enqueue(positionList);
		}
	}

	//queue.enqueue([[grammar.root, 0, new Set('$')]]);

	/*
	while (queue.length > 0) {
		const states = queue.dequeue();

		for (const [p, o, la] of states) {
			const pid 			= id(p, o, la);
			const hash 			= new Map;

			if (rows.has(pid))
				continue;
			else {
				const row	= table.newRow(translator);
				const i		= index++;
				rows.set(pid, [i, row]);

				if (logger)
					logger.log(`\nstate (${i}):`);

				const nextTable = new Map;
				const forwards = new Map;
				for (let [prod, off, lah] of item(states)) {
					const [nt, production] = grammar.productions[prod];
					if (logger)
						logger.log(
							'\t',
							nt,
							'->',
							production.slice(0, off).join('') +
							'.' +
							production.slice(off).join(''),
							'\t|\t',
							lah
							);
					if (off === production.length) {
						for (let lookahead of lah) {
							const action = ['r', prod];
							if (row.has(lookahead)) {
								const [op, n] = row.get(lookahead);
								if (op === 'r') {
									throw new Error(
										`Reduce/reduce conflict between ${n} and ${prod}.`);
								} else {
									// handle shift/reduce conflict
									resolveSR(prod, lookahead, row, {reduce: action});
								}
							} else {
								row.set(lookahead, action);
							}
						}
					} else {
						const next = production[off];
						const code = `${next}-${sids.getId(lah)}`;

						if (!nextTable.has(code)) {
							forwards.set(code, stringify(prod, off + 1, lah));
							nextTable.set(code, []);
						} else {
							forwarding.set(
								stringify(prod, off + 1, lah),
								forwards.get(code)
								);
						}

						nextTable
							.get(code)
							.push([prod, off + 1, lah]);
						
						const nextId = id(prod, off + 1, lah);
						if (grammar.terminals.has(next)) {
							const action = ['s', nextId];
							if (row.has(next)) {
								const [op, num] = row.get(next);
								if (op === 's') {
									row.set(next, action);
								} else {
									// resolve shift/reduce conflict
									resolveSR(num, next, row, {shift: action});
								}
							} else
								row.set(next, action);
						} else {
							row.set(next, nextId, true);
						}
					}
				}

				for (let [symbol, itemees] of nextTable) {
					queue.enqueue(itemees);
				}
			}

		}
	}
	*/

	for (let row of rows) {
		row.append();
	}
    
    return table;
}
