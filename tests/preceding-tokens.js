{
	test('2-lookahead ambiguities', (api) => {
		const lang = language(`
			l
				> m		=>
					sum = 0
					for num in $[0]
						sum += num
					sum

			m
				> s			=> [$[0]]
				> m ',' s	=> [...$[0], $[2]]


			s
				> b '|' e	=> $[0] / $[2]
				> e

			e
				> \\int	=> parseInt $[0]
				> o
				> a

			b
				> a
				> o

			o
				> e '&' e	=> $[0] + $[2]

			a
				> \\id	=> $[0].length

		`);

		// lang.log();

		api.eq(lang.parse('2 & 5, 5'), 12)
		api.eq(lang.parse('8 & 4 | 6, 5 & tammy'), 12)

	});
}