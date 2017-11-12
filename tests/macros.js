{
	test('Serialization without delimiter', (api) => {
		const lispy = language(`
			e
				> \\int				=> parseInt $[0]
				> "+" @multiple(e)	=> $[1].reduce ((sum, val) -> sum + val), 0
				> "*" @multiple(e)	=> $[1].reduce ((pro, val) -> pro * val), 1
				> "(" e ")"			=> $[1]
		`);

		api.eq(lispy.parse('+ 1 2 3 (* 2 5)'), 16);
	});

	test('Serialization with delimiter', (api) => {
	    const lispy = language(`
			e
				> \\int					=> parseInt $[0]
				> "+" @multiple(e, ",")	=> $[1].reduce ((sum, val) -> sum + val), 0
				> "*" @multiple(e, ",")	=> $[1].reduce ((pro, val) -> pro * val), 1
				> "(" e ")"				=> $[1]
		`);

		api.eq(lispy.parse('+ 1, 2, 7, (* 2, 2)'), 14);
	});
}