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

	test('Serialization - terminal delimiter', (api) => {
	    const lispy = language(`
			e
				> \\int					=> parseInt $[0]
				> "+" @multiple(e, ",")	=> $[1].reduce ((sum, val) -> sum + val), 0
				> "*" @multiple(e, ",")	=> $[1].reduce ((pro, val) -> pro * val), 1
				> "(" e ")"				=> $[1]
		`);

		api.eq(lispy.parse('+ 1, 2, 7, (* 2, 2)'), 14);
	});

	test('Serialization - non-terminal delimiter', (api) => {
	    const lispy = language(`
			e
				sep
					> ","
					> "&"
				> \\int					=> parseInt $[0]
				> "+" @multiple(e, sep)	=> $[1].reduce ((sum, val) -> sum + val), 0
				> "*" @multiple(e, sep)	=> $[1].reduce ((pro, val) -> pro * val), 1
				> "(" e ")"				=> $[1]
		`);

		api.eq(lispy.parse('+ 1, 2, 7 & (* 2 & 4)'), 18);
	});

	test('Serialization - nullability', (api) => {
	    const bad = language(`

			e
				> \\int							=> parseInt $[0]
				> "{" "+" @multiple(e, ",") "}"	=> $[2].reduce ((sum, val) -> sum + val), 0
				> "{" "*" @multiple(e) "}"		=> $[2].reduce ((pro, val) -> pro * val), 1
				> "(" e ")"						=> $[1]
		`);

		api.eq(bad.parse('{+ 1, 2, 7, {*}, {+}, {* 4 4}}'), 27);
	});
}