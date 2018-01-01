
test('Nullability - basic support', (api) => {
	const arraySum = language(`

		s
			> e	=> $[0]

		e
			> \\int				=> parseInt $[0]
			> "[" multi "]"		=> $[1].reduce ((sum, val) -> sum + val), 0
			> "{" multi "}"		=> $[1].reduce ((sum, val) -> sum * val), 1

		multi
			> ''		=> []
			> multi e	=> [...$[0], $[1]]

	`);

	api.eq(arraySum.parse('[1 2 [] 7 {} {2 2}]'), 15);
});