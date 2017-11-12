
const tangler 	= require('./src/index');
const fs 		= require('fs');
const cc 		= require('cli-color');

const fail = cc.red('\u2718');
const win = cc.green('\u2714');

function nice(msg) {
	if (msg.length === 0) {
		return '!';
	} else {
		return ` ("${msg}")!`;
	}
}

class TestKit {
	constructor(id) {
		this.id = id;
	}

	eq(a, b, msg) {
		if (a !== b) {
			throw new Error(`"${this.id}": Equality test failed${nice(msg)}`);
			return false;
		} else return true;
	}

	arrayEq(a1, a2, msg = "array elements test") {
		if (a1.length === a2.length) {
			for (let i = 0; i < a1.length; i++) {
				let truth = this.eq(a1[i], a2[i], msg);
				if (!truth) return false;
			}

			return true;
		} else {
			throw new Error(`"${this.id}": Inequality test failed${nice(msg)}`);
		}
	}

	neq(a, b, msg) {
		if (a === b) {
			throw new Error(`"${this.id}": Inequality test failed${nice(msg)}`);
			return false;
		} else return true;
	}

	throws(fn, msg) {
		try {
			fn();
			throw new Error(`"${this.id}": Did not throw${nice(msg)}`);
			return false;
		} catch (e) {
			return true;
		}
	}

	assert(expr, msg) {
		if (!expr)
			throw new Error(`"${this.id}": Assertion Error${nice(msg)}`);
	}
	
	isInstance(obj, ctor, msg) {
		return this.assert(obj instanceof ctor, msg);
	}

	throwError() {
	    var t = null;
	    return t.noprop.noprop;
	}

	dontThrowError() {
	    return 5;
	}

	is(value, target) {
		return typeof value === target;
	}
}


function showError(e) {
	console.log('');
	console.log(cc.red(e.stack));
	console.log('\n\n');
}

const testCases =
  fs
	.readdirSync('tests')
	.filter(file => /[0-9]+/.test(file))
	.map(file => parseInt(file))
	.sort((a, b) => a - b);

console.log(`Running ${testCases.length} tests ...\n`);
for (let testCase of testCases) {
	try {
		let lib = tangler.require(`./tests/${testCase}/a`, __filename);
		let name = lib.name();
		try {
			var result = lib.test(new TestKit(name));
			console.log(`${testCase} : ${result?win:fail}\t(${name})`);
		} catch (e) {
			console.log(`${testCase} : ${fail}\t(${name})`);
			showError(e);
		}
	} catch (e) {
		console.log(`${testCase} : ${fail} => Loading Error`);
		showError(e);
	}
}


