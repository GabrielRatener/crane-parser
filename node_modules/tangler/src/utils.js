const acorn 		= require('acorn');
const asyncPlugin	= require('acorn-es7-plugin');
const {generate} 	= require('escodegen');
const vm 			= require('vm');
const Module 		= require('./module');
const extractVars	= require('./extract-vars');

const moduleCache = new Map();

const parseOpts = {
	plugins: {
		asyncawait: true
	},
	sourceType: 'module',
	ecmaVersion: 7,
	locations: true
};

const genOpts = {
	sourceMap: true,
	sourceMapWithCode: true
};

const sourceCache = new Map();

function processProgram(ast) {
	const exports = [];
	const imports = new Map();
	const bodies = [];
	const relays = new Map();

	let filtered = [];
	let defaultName = null;

	for (let line of ast.body) {
		if (line.type === 'ImportDeclaration') {
			const importee = line.source.value;
			if (!imports.has(importee)) {
				imports.set(importee, []);
			}
			const importList = imports.get(importee);

			for (let specifier of line.specifiers) {
				if (specifier.type === 'ImportDefaultSpecifier') {
					const {local} = specifier;
					importList.push({
						local: local.name,
						imported: 'default'
					});
					continue;
				}

				if (specifier.type === 'ImportNamespaceSpecifier') {
					const {local} = specifier;
					importList.push({
						local: local.name,
						imported: '*'
					});
					continue;
				}

				if (specifier.type === 'ImportSpecifier') {
					const {local, imported} = specifier;
					importList.push({
						local: local.name,
						imported: imported.name
					});
					continue;
				}
	
				throw new Error('WTF!');
			}

			continue;
		}



		if (line.type === 'ExportDefaultDeclaration') {
			bodies.push(makeProgram(filtered));
			filtered = [];

			if (line.declaration.type === 'FunctionDeclaration' ||
				line.declaration.type === 'ClassDeclaration') {

				if (line.declaration.id) {
					defaultName = line.declaration.id.name;
					filtered.push(line.declaration);
				} else {
					const expression = Object.assign({}, line.declaration);
					expression.type = expression.type
						.replace('Declaration','Expression');
					filtered.push(makeStatement(expression));
				}
			} else {
				filtered.push(makeStatement(line.declaration));
			}

			bodies.push(makeProgram(filtered));
			filtered = [];
			continue;
		}

		if (line.type === 'ExportNamedDeclaration') {
			if (line.declaration) {
				if (line.declaration.type === 'VariableDeclaration') {
					for (let declarator of line.declaration.declarations) {
						for (let name of extractVars(declarator.id)) {
							exports.push({
								local: name,
								exported: name
							});					
						}
					}
				} else {
					const name = line.declaration.id.name;
					exports.push({
						local: name,
						exported: name
					});					
				}
				filtered.push(line.declaration);
			} else {

				if (line.source) {
					const source = line.source.value;
					if (!imports.has(source)) {
						imports.set(source, []);
					}

					if (!relays.has(source)) {
						relays.set(source, {
							all: false,
							exportees: []
						});
					}

					const relay = relays.get(source);
					if (relay.all)
						throw new Error('Already exporting all!');

					for (let {local: imported, exported} of line.specifiers) {
						relay.exportees.push({
							imported: imported.name,
							exported: exported.name
						});
					}					
				} else {
					for (let {local, exported} of line.specifiers) {
						exports.push({
							local: local.name,
							exported: exported.name
						});
					}					
				}
			}

			continue;
		}

		if (line.type === 'ExportAllDeclaration') {
			const source = line.source.value;
			if (!imports.has(source)) {
				imports.set(source, []);
			}

			relays.set(source, {all: true})

			continue;
		}

		filtered.push(line);
	}

	bodies.push(makeProgram(filtered));

	return {exports, imports, bodies, relays, defaultName};
}

function makeStatement(expression) {
	return {
		type: 'ExpressionStatement',
		expression
	}
}

function makeProgram(lines) {
	return {
		type	: 'Program',
		body	: lines
	}
}

// bring all function declarations and exports containing them to top
// of the program
function hoistFunctions(program) {
	var functions = [];
	var body = [];
	for (let line of program.body) {
		if (line.type === 'ExportDefaultDeclaration') {
			if (line.declaration.type === 'FunctionDeclaration') {
				functions.push(line);
			} else {
				body.push(line);
			}

			continue;
		}

		if (line.type === 'ExportNamedDeclaration') {
			if (!!line.declaration &&
				line.declaration.type === 'FunctionDeclaration') {

				functions.push(line);
			} else {
				body.push(line);
			}

			continue;
		}

		if (line.type === 'FunctionDeclaration') {
			functions.push(line);
		} else {
			body.push(line);
		}
	}

	return makeProgram([...functions, ...body]);
}

// get ast from loaded id (if applicable)
function getAST(load) {

	if (load.ast) {
		return load.ast;
	} else {
		if (load.source) {
			const opts = Object.assign({sourceFile: load.sourceFile}, parseOpts);
			return acorn.parse(load.source, opts);
		} else {
			throw new Error('Cannot get AST!');
		}
	}
}

// fetches Module objects given a specific id and resolver
exports.getModuleFromId = getModuleFromId;
function getModuleFromId(id, resolver) {
	if (!moduleCache.has(id)) {
		const load = resolver.load(id);
		if (load.module) {
			moduleCache.set(id, load.module);
			return load.module;
		} else {
			const ast = hoistFunctions(getAST(load));
			const {exports, imports, relays, bodies, defaultName}
				= processProgram(ast);
			const ctxt = Object.assign({}, load.context);
			const module = new Module(exports, id, ctxt);
			let defaultValue;

			moduleCache.set(id, module);

			for (let [source, importees] of imports) {
				const importedId = resolver.resolveId(source, id);
				const importedModule = getModuleFromId(importedId, resolver);

				// relays, aka
				// export ... from "some source"
				// declarations are handled here
				if (relays.has(source)) {
					const {all, exportees} = relays.get(source);
					if (all) {
						for (let exportName of importedModule.exports()) {
							module.addExportRelay(importedModule, exportName);
						}
					} else {
						for (let {imported, exported} of exportees) {
							module.addExportRelay(importedModule, imported, exported);
						}
					}
				}

				for (let {local, imported} of importees) {
					if (imported === '*') {
						importedModule.addNamespaceBinding(ctxt, local);
						continue;
					}

					if (imported === 'default') {
						importedModule.addDefaultBinding(ctxt, local);
						continue;
					}

					// if not default or namespace ...
					importedModule.addBinding(ctxt, imported, local);
				}
			}

			// if module has no default export
			if (bodies.length === 1) {
				const {code, map} = generate(bodies[0], genOpts);
				const filename = `${id}+0`;
				sourceCache.set(filename, {code, map});
				vm.runInNewContext(code, ctxt, {filename});

			// if module has a default export (length === 3)
			} else {
				const tuples = bodies.map(ast => generate(ast, genOpts));
				const codes = tuples.map(({code}) => code);
				tuples.forEach((tuple, i) => {
					sourceCache.set(`${id}-${i}`, tuple);
				});
				vm.runInNewContext(codes[0], ctxt, {filename: `${id}+0`});
				defaultValue = vm.runInNewContext(
					codes[1], ctxt, {filename: `${id}+1`});
				if (defaultName) {
					defaultValue = vm.runInNewContext(
						defaultName, ctxt, {filename: `${id}+1`});
				}

				vm.runInNewContext(codes[2], ctxt, {filename: `${id}+2`});
				module.default = defaultValue;
			}

			module.lock();

			return module;
		}
	} else {
		return moduleCache.get(id);
	}
}

// runs a given ID, and throws error if ID represents module (it exports)
exports.runId = runId;
function runId(id, resolver) {
	const load = resolver.load(id, true);
	const ast = hoistFunctions(getAST(load));
	const {exports, imports, bodies, relays, defaultName}
		= processProgram(ast);
	const ctxt = (!!load.context) ? Object.assign({}, load.context) : {};

	if (exports.length > 0 || relays.length > 0 || bodies.length > 1) {
		throw new Error(`File "${id}" cannot be a module!`);
	} else {
		const {code, map} = generate(bodies[0], genOpts);
		sourceCache.set(`${id}+0`, {code, map});
		for (let [source, importees] of imports) {
			const importedId = resolver.resolveId(source, id);
			const importedModule = getModuleFromId(importedId, resolver);

			for (let {local, imported} of importees) {
				if (imported === '*') {
					importedModule.addNamespaceBinding(ctxt, local);
					continue;
				}

				if (imported === 'default') {
					importedModule.addDefaultBinding(ctxt, local);
					continue;
				}

				// if not default or namespace ...
				importedModule.addBinding(ctxt, imported, local);
			}
		}

		return vm.runInNewContext(code, ctxt, {filename: `${id}+0`});
	}
}

exports.sourceCache = sourceCache;

asyncPlugin(acorn);