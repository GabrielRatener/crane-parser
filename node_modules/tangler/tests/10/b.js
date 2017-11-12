
export async function doper() {
	const a = await Promise.resolve(3);
	const b = await Promise.resolve(88);
	
	return a + b;
}

export const afun = async (e) => e + e;

export function simple() {
	return 44;
}