
import * as creep from './b';

export function test(api) {
	api.eq(creep.a, 7);
	api.eq(creep.crawl(2), '99');

	try {
		creep.a = 5;
		return false;
	} catch(e) {
		return true;
	}

	return true;
}

export function name() {
	return "Export namespace declarations";
}
