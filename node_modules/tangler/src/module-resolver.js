
module.exports = class ModuleResolver {
	constructor(resolveId, load) {
		this.moduleCache = new Map();
		this.resolveId = resolveId;
		this.load = load;
	}
}