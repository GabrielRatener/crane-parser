
import {doper} from "./b";

export function test(api) {
	api.eq(doper() + 1, 6);

	return true;
}

export function name() {
	return "Export default aliasing in lists"
}