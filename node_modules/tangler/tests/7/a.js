
import {a, mutato as mut, sqr} from './b';

export function test(api) {
	api.eq(a, 9);
	mut();
	api.eq(a, 11);
	api.eq(sqr(a), 121);

	return true;
}

export function name() {
	return "Export select declarations";
}
