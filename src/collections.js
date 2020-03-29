
// All (relatively) abstract collections go in here


export class SparseTable {

	static fromJSON({width, height, values}) {
		const table = new this(width, height);
		for (const [y, x, value] of values) {
			table.set(y, x, value);
		}

		return table;
	}

	constructor(width, height) {
		this.width = width;
		this.height = height;

		this._map = new Map();
	}

	
	toJSON() {
		const values = [];

		for (const [y, x] of this) {
			values.push([y, x, this.get(y, x)]);
		}

		return {
			values,
			width: this.width,
			height: this.height
		}
	}

	verify(y, x) {
		if (y >= 0 && y < this.height
			&& x >= 0 && x < this.width) {

			return true;
		} else {
			return false;
		}
	}

	enforce(y, x) {
		if (!this.verify(y, x)) {
			throw new Error(`Coordinates (y=${y}, x=${x}) out of bounds`);
		}
	}

	encode(y, x) {
		return `${y}-${x}`;
	}

	decode(hash) {
		return hash.split('-').map(s => parseInt(s, 10));
	}

	exists(y, x) {
		return this.verify(y, x) && this._map.has(this.encode(y, x));
	}

	set(y, x, value) {
		this.enforce(y, x);
		const hash = this.encode(y, x);

		if (value === undefined)
			this._map.delete(hash);
		else
			this._map.set(hash, value);
	}

	get(y, x) {
		this.enforce(y, x);

		const hash = this.encode(y, x);
		if (this._map.has(hash)) {
			return this._map.get(hash);
		} else {
			return undefined;
		}
	}

	* [Symbol.iterator]() {
		for (let [key] of this._map) {
			yield this.decode(key);
		}
	}
}

export class Trie {
	static node(...args) {
		const [value] = args;
		const obj = {next: new Map};

		if (args.length > 0)
			obj.value = value;
		return obj;
	}

	constructor() {

		// don't read or modify `root` directly, use methods instead
		this.root = this.constructor.node();
	}

	set(sequence, value) {
		let node = this.root;
		for (let token of sequence) {
			const {next} = node;
			if (!next.has(token)) {
				next.set(token, this.constructor.node(new Map))
			}

			node = next.get(token);
		}

		node.value = value;
	}

	get(sequence) {
		let node = this.root;
		for (let token of sequence) {
			const {next} = node;
			if (!next.has(token)) {
				throw new Error('Cannot get: sequence not in trie');
			}

			node = next.get(token);
		}

		if (node.hasOwnProperty('value')) {
			return node.value;
		} else {
			throw new Error('Cannot get: sequence has no value')
		}
	}

	has(sequence) {
		let node = this.root;
		for (let token of sequence) {
			const {next} = node;
			if (!next.has(token)) {
				return false;
			}

			node = next.get(token);
		}

		return node.hasOwnProperty('value');
	}
}

export class Queue {
	static node(value, next = null) {
		return {value, next};
	}

	constructor() {
		// values move through the "digestive track" from head to ass

		// don't mess directly with any of these properties, seriously
		this._head = null;
		this._ass = null;
		this._length = 0;
	}

	// eat a value in the head of the queue
	enqueue(value) {
		if (this._length === 0) {
			this._ass = this._head = this.constructor.node(value);
		} else {
			this._head.next = this.constructor.node(value);
			this._head = this._head.next;
		}

		this._length++;
	}

	// crap a value out the ass of the queue
	dequeue() {
		if (this._length === 0)
			throw new Error('Cannot dequeue from empty Queue');
		else {
			const {value} = this._ass;
			this._ass = this._ass.next;

			if (this._length === 1)
				this._head = null;
			this._length--;

			return value;
		}
	}

	get length() {
		return this._length;
	}
}

export class SubSet extends Set {
	constructor(iterable, parent = null) {
		super(iterable);
		this._parent = parent;
	}

	sub(iterable = []) {
		return new this.constructor(iterable, this);
	}

	has(value) {
		if (super.has(value))
			return true;
		else {
			if (this._parent instanceof this.constructor)
				return this._parent.has(value);
			else
				return false
		}
	}

	add(value) {
		if (!this.has(value)) {
			super.add(value);
		}
	}
}
