
import {simple} from "./b";

export function test(api) {
	api.eq(2 * simple(), 88);

	return true;
}

export function name() {
	return "Standards support"
}