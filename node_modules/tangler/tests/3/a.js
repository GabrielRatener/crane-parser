
import value from './b';
import declaration from './c';

export function test(api) {
	api.eq(value, 5);
	api.eq(declaration(), 7);

	return true;
}

export function name() {
	return "Default imports";
}

