
# Tangler

#### Use [ES6 modules](http://www.2ality.com/2014/09/es6-modules-final.html) in Node.js, today!

## Install

```
$ npm install -g tangler    # install globally
$ npm install tangler       # install as local dependency
```

## API

Tangler exports two functions, `require` and `run`.

* `tangler.require(path, origin = null, options = {})`

    Require an ES6 module. All properties are bindings to the variables exported from the module. The `default` property is the binding to the module's default value, if present.
* `tangler.run(path, origin = null, options = {})`

    Run an ES6 module from entry point path. Any exported values from the module being run will throw an error
* `tangler.transformStack(stackTrace)`
	
	Returns a transformed stack trace that uses source maps to provide accurate error locations in the source.

If origin is `null` or unspecified, module paths will be resolved from the current working directory.

Usage

```js
var tangler = require('tangler');

// for better error reporting
process.on('uncaughtException', (err) => {
	console.log(tangler.transformStack(err.stack));
	process.exit(1);
});

var myImportedModule = tangler.require('path/to/module', __dirname);

console.log(myImportedModule.someExportedFunction());

```
    
## Command

Tangler comes with a command if installed globally, it takes no options curre

```
$ tangler path/to/module/entry.js
```
 Equivalent to calling
 ```js
 tangler.run('path/to/module/entry.js');
 ```