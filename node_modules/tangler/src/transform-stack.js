
const sm = require('source-map');

const noparenRegex 	= /^\s+at (.+):([0-9]+)\:([0-9]+)$/;
const parenRegex 	= /^\s+at (.+) \((.+):([0-9]+)\:([0-9]+)\)$/;
const offset		= '    ';

function parseLine(line) {
	if (parenRegex.test(line)) {
		const groups = parenRegex.exec(line);
		return {
			code		: groups[1],
			source		: groups[2],
			line		: +groups[3],
			column		: +groups[4],
		};
	} else {
		const groups = noparenRegex.exec(line);
		return {
			code		: null,
			source		: groups[1],
			line		: +groups[2],
			column		: +groups[3],
		};
	}
}

function parseStack(stack) {
	const lines = stack.split('\n');
	const stackLines = [];

	while (lines.length > 0) {
		const top = lines[lines.length - 1];
		if (noparenRegex.test(top) || parenRegex.test(top)) {
			stackLines.push(parseLine(top));
			lines.pop();
		} else {
			break;
		}
	}

	return {
		body	: lines.join('\n'),
		stack	: stackLines.reverse(),
	};
}

module.exports = transformStack;
function transformStack(cache, stackText) {
	const {body, stack} = parseStack(stackText);
	let newStack = `\n${body}`;
	for (let row of stack) {
		let line, column, source;
		let {code} = row;
		if (cache.has(row.source)) {
			const {map} 	= cache.get(row.source);
			const smc		= new sm.SourceMapConsumer(map.toString());
			const obj		= smc.originalPositionFor(row);
			({line, column, source} = obj);
		} else {
			({line, column, source} = row);
		}

		if (code === null) {
			newStack += `\n${offset}at ${source}:${line}:${column}`;
		} else {
			newStack += `\n${offset}at ${code} (${source}:${line}:${column})`;			
		}
	}

	return newStack;
}

