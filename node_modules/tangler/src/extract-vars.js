

function* identifier(node) {
	yield node.name;
}

function* objectPattern(node) {
	for (var prop of node.properties) {
		yield* extractVars(prop.value);
	}
}

function* arrayPattern(node) {
	for (var elem of node.elements) {
		if (elem)
			yield* extractVars(elem);
	}
}

function* restElement(node) {
	yield* extractVars(node.argument);
}

function* assignmentPattern(node) {
	yield* extractVars(node.left);
}

const extractorTable = {
	Identifier			: identifier,
	ObjectPattern		: objectPattern,
	ArrayPattern		: arrayPattern,
	RestElement			: restElement,
	AssignmentPattern	: assignmentPattern
}

module.exports = extractVars;
function extractVars(pattern) {
	const fn = extractorTable[pattern.type];
	return fn(pattern);
}