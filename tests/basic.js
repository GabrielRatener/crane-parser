
{
    test(`Simple multiplication grammar`, (api) => {
		// so freakin simple right?!?
		const simple = language(`
	        A
	            > \\int     => parseInt $[0]
	            > A A 		=> $[0] * $[1]
	    `);

		api.eq(simple.parse('3 11'), 33);
    });
}