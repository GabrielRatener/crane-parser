
export class CharSource {
	[Symbol.iterator] () {
		var i = 0, me = this;
		return {
			next() {
				let c = me.get(i++);
				return {
					done: (c === null || c === undefined),
					value: c
				};
			}
		}
	}

	get() {
		throw new Error("'get' method must be implemented on all CharSource inheritors!");
	}
}

export class StringSource extends CharSource {
	constructor(string) {
		super();

		this._length = string.length;
		this._string = string;
	}

	get(i) {
		if (i < this._length) {
			return this._string[i];
		} else {
			return null;
		}
	}
}
