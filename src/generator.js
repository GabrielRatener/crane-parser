
import {Trie, Queue} from "./collections"
import {ParsingTable} from "./parser"
import {EOF, EPS} from "./grammar"
import {LEFT, RIGHT} from './precedence'

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


// all these functions take in a grammar and output a parsing table

// LR(1) generator
export function clr(grammar, log = false) {
	function lookaheads(prev, current) {
		const [lastP, offset, set] = prev;
		const [nowP] = current;

		const [nt, pro] = grammar.productions[lastP];

		const s = setify(grammar.first(pro.slice(offset + 1)));

		if (s.size === 0)
			return set;
		else
			return s;
	}

	function* closure(p, o, set, seen = new Set) {
		const hash = id(p, o, set);
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

	function item(itemees) {
		const table = new Map;
		const list = [];
		for (let [p, o, ls] of itemees) {
			for (let [pro, off, set] of closure(p, o, ls)) {
				if (table.has(id(pro, off))) {
					const lahSet = table.get(id(pro, off));
					set.forEach(lah => lahSet.add(lah));
				} else {
					const lahSet = new Set(set);
					table.set(id(pro, off), lahSet);
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

		//console.log('resolving...')
		//console.log([prod, rPrec], [lookahead, sPrec])

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
		}
	}

	const sids = setIdTracker();

	// p = production, o = offset
	const table = new ParsingTable(grammar);
	const rows = new Map();
	const queue = new Queue();
	const forwarding = new Map
	let index = 0;

	queue.enqueue([[grammar.root, 0, new Set('$')]]);

	while (queue.length > 0) {
		const states	 	= queue.dequeue();
		const [p, o, la]	= states[0];
		const pid 			= id(p, o, la);
		const hash 			= new Map;

		if (rows.has(pid))
			continue;
		else {
			const row	= table.newRow(translator);
			const i		= index++;
			rows.set(pid, [i, row]);

			if (log)
				console.log(`\nstate (${i}):`)

			const nextTable = new Map;
			const forwards = new Map;
			for (let [prod, off, lah] of item(states)) {
				const [nt, production] = grammar.productions[prod];
				if (log)
					console.log(
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

					if (!nextTable.has(next)) {
						forwards.set(next, stringify(prod, off + 1, lah));
						nextTable.set(next, []);
					} else {
						forwarding.set(
							stringify(prod, off + 1, lah),
							forwards.get(next)
							);
					}

					nextTable
						.get(next)
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

	for (let [pid, [index, row]] of rows) {
		row.append();
	}
    
    return table;
}
