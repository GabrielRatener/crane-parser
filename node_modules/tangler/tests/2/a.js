
import {change, a as b} from './b';

export function test(api) {
	api.eq(b, 3);
	change();
	api.eq(b, 9);

	try {
		b = 5;
		return false;
	} catch (e) {
		return true;
	}
}

export function name() {
	return "Variable binding immutability";
}
