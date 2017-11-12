const vm = require('vm');

const code = `for (let i = 0; i < 1000000; i++) {(a + 6);}`;

console.time('getter');

vm.runInNewContext(code, {
	get a() {
		return 3;
	}
});
console.timeEnd('getter');



console.time('normal prop');

vm.runInNewContext(code, {
	a: 3
});
console.timeEnd('normal prop');




const newCode = `var a = 3;${code}`;

console.time('noprop');

vm.runInNewContext(newCode, {});
console.timeEnd('noprop');


const closedCode = `(function(){${newCode}})();`

console.time('noprop enclosed');

vm.runInNewContext(closedCode, {});
console.timeEnd('noprop enclosed');



console.log('\n');


var c = vm.createContext({
	get a() {
		return 3;
	}
});
console.time('prep getter');
vm.runInContext(code, c);
console.timeEnd('prep getter');


var c = vm.createContext({
	a: 3
});
console.time('prep normal prop');
vm.runInContext(code, c);
console.timeEnd('prep normal prop');



var c = vm.createContext({});
console.time('prep noprop');
vm.runInContext(newCode, c);
console.timeEnd('prep noprop');


var c = vm.createContext({});
console.time('prep noprop enclosed');
vm.runInContext(closedCode, c);
console.timeEnd('prep noprop enclosed');


console.log('\n');

var c = vm.createContext({});
var outClosed = `var a = 3;(function(){${code}})();`;
console.time('outclosed');
vm.runInContext(outClosed, c);
console.timeEnd('outclosed');


console.log('\n');

var c = vm.createContext({});
var outClosed = `var a = 3;(function(a){${code}})(a);`;
console.time('nobind');
vm.runInContext(outClosed, c);
console.timeEnd('nobind');


console.log('\n');

var c = vm.createContext({a: 3});
var outClosed = `const a = 3;${code};`;
console.time('const');
vm.runInContext(outClosed, c);
console.timeEnd('const');

console.log('\n');

var c = vm.createContext(Object.freeze({a: 3}));
console.time('frozen context');
vm.runInContext(`${code}`, c);
console.timeEnd('frozen context');


var called = false;
var i = 0;
var obj = {
	get a() {
		i += 1;
		if (!called) {
			called = true;
			vm.runInNewContext(`'use strict';const a = global.a`, c);
		}
		return 3;
	}
};
obj.global = obj;
var c = vm.createContext(Object.freeze(obj));
console.time('dynamic const');
vm.runInContext(`${code}`, c);
console.timeEnd('dynamic const');
console.log(i);