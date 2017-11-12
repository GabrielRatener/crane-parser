
export function repeat(str, n) {
	let string = "";
	while (n --> 0) {
		string += str;
	}

	return string;
}

export function addSpacing(text, n) {
	let an = n - (text + "").length;

	return text + repeat(' ', an);
}
