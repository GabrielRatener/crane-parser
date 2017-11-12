
import declaration from './b';

export function test(api) {
	api.eq(new declaration().prop, 8);

	return true;
}

export function name() {
	return "Default imports";
}

