const vm = require('vm');

module.exports = class Module {
	constructor(exports, id, object, virtual = false) {
		this._exports 		= new Map();
		this._object 		= object;
		this._defaultValue 	= null;
		this._hasDefault 	= false;
		this._bindingCache 	= new Map();
		this._relayCache 	= new Map();
		this._virtual		= virtual;

		this.id = id;		
		for (let {local, exported = local} of exports) {
			this._exports.set(exported, local);
		}
	}

	set object(object) {
		this._object = object;
	}

	// set default value for module
	set default(defaultValue) {
		this._hasDefault = true;
		this._defaultValue = defaultValue;
	}

	// for the case of
	// import {name as alias} from "this module"
	addBinding(importer, name, alias = name) {
		if (!this.hasExport(name)) {
			throw new Error(`Module '${this.id}' does not export name '${name}'!`);
		} else {
			if (this._relayCache.has(name)) {
				const {imported, module} = this._relayCache.get(name);
				module.addBinding(importer, imported, alias);
			} else {
				const local = this._exports.get(name);
				let property;
				if (this._bindingCache.has(local)) {
					const property = this._bindingCache.get(local);
					Object.defineProperty(importer, alias, property);
				} else {
					if (name === 'default') {
						property = {
							get: () => {
								return this._defaultValue;
							},
							set() {
								throw new Error('Immutable default binding: cannot change value!');
							}
						}
					} else if (!this._virtual) {
						const code = `({get() {return ${local};}})`;
						property = vm.runInNewContext(code, this._object);
						property.enumerable = true;
						property.set = () => {
							throw new Error('Immutable binding: cannot change value!');
						}
					} else {
						property = {
							get: () => {
								return this._object[local];
							},
							enumerable: true,
							set() {
								throw new Error('Immutable binding: cannot change value!');
							}
						}
					}

					this._bindingCache.set(local, property);				
					Object.defineProperty(importer, alias, property);
				}
			}
		}
	}

	// for cases like
	// import * as namespace from "this module"
	addNamespaceBinding(importer, name) {
		importer[name] = this.snapshot();
	}

	// for cases like
	// import defVal from "this module"
	addDefaultBinding(importer, name) {
		if (!this._hasDefault) {
			throw new Error(
				`No default value to export in '${this.id}'!`);
		} else {
			Object.defineProperty(importer, name, {
				get: () => {
					return this._defaultValue;
				},
				set: (val) => {
					throw new Error('Cannot reset default value!');
				}
			});
		}
	}

	hasExport(name) {
		if (name === 'default')
			return this._hasDefault;
		else
			return this._exports.has(name) || this._relayCache.has(name);
	}

	// get all exports (local and relayed)
	* exports() {
		for (let [exported] of this._exports) {
			yield exported;
		}

		for (let [exported] of this._relayCache) {
			yield exported;
		}
	}

	// returns object with all exports as properties
	snapshot(def = false) {
		const obj = {};
		for (let exported of this.exports()) {
			this.addBinding(obj, exported);
		}

		if (def && this._hasDefault)
			this.addDefaultBinding(obj, 'default');
		return obj;
	}

	// add Relayed export
	addExportRelay(srcModule, imported, exported = imported) {
		this._relayCache.set(exported, {
			imported,
			module: srcModule
		});
	}

	lock() {
		Object.freeze(this);
	}
}
