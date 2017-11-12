const defaultResolver 						= require('./node-resolver');
const {getModuleFromId, runId, sourceCache} = require('./utils');

exports.run = function run(importee, importer = null,
		{resolver = defaultResolver()} = {}) {
	const id = resolver.resolveId(importee, importer);

	return runId(id, resolver);
}

exports.require = function require(importee, importer = null,
		{resolver = defaultResolver()} = {}) {
	const id 		= resolver.resolveId(importee, importer);
	const module	= getModuleFromId(id, resolver);

	return module.snapshot(true);
}

exports.transformStack = require('./transform-stack')
	.bind(null, sourceCache);

