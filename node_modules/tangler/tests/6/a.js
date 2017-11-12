
import {a, mutate as mut, square} from './b';

export function test(api) {
	api.eq(a, 9);
	mut();
	api.eq(a, 11);
	api.eq(square(a), 121);

	return true;
}

export function name() {
	return "Export all declarations";
}
