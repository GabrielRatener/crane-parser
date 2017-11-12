

export default function(forbidden, name, add = true) {
	var varName = `_${name}`, i = 2;
	while (true) {
		if (!forbidden.has(varName)) {
			if (add) {
				forbidden.add(varName);
			}
			return varName;
		} else {
			varName = `_${name}${i}`;
			i++;
		}
	}
}
