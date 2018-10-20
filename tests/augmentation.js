{
	const code = `
		e
			> \\int			=> parseInt($[0], 10)
			> '(' e ')'		=> $[1]
			> e '/' e		=> $[0] / $[2]
			> e '*' e		=> $[0] * $[2]
	`;

	let cooked, Parser, parsing;

	const parse = (string) => {
		const parsing = new Parser();

		for (const token of tokenize(string)) {
			parsing.push(token);
		}

		return parsing.finish();
	}

	const {grammar} = getCraneGrammar(code);

	test("Augmentation - cook grammar", () => {
		cooked = grammar.cook();
	});

	test("Augmentation - generate parser", () => {
		Parser = cooked.generateParser()
	});

	test("Augmentation - instantiate parser", () => {
		parsing = new Parser();
	});


	test("Augmentation - non-augmented parser", (api) => {
		api.eq(parse(`7 * 4 * 2`), 56);

		// this shouldn't work yet!
		api.throws(() => {
			parse(`(7 * 4 * 2) + 3`);
		});
	});

	test("Augmentation - augment grammar", (api) => {
		cooked.augment('e', ['e', '+', 'e'], ([left,,right]) => {
			return left + right;
		});

		cooked.augment('e', ['e', '-', 'e'], ([left,,right]) => {
			return left - right;
		});

		Parser = cooked.generateParser();
		parsing = new Parser();

		api.eq(parse(`((7 * 4) + 2) - 4`), 26);
	});
}