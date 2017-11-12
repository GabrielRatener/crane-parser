
import {Declaration} from './b';

export function test(api) {
	api.eq(new Declaration().prop, 11);

	return true;
}

export function name() {
	return "Cycles";
}
