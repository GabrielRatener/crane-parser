{
	const code = `
		%left '+' '-'
		%left '/' '*'

		e
			> \\int			=> parseInt($[0], 10)
			> '(' e ')'		=> $[1]
			> e '/' e		=> $[0] / $[2]
			> e '*' e		=> $[0] * $[2]
			> e '+' e		=> $[0] + $[2]
			> e '-' e		=> $[0] - $[2]
	`;


	const parse = (string, Parser) => {
		const parsing = new Parser();

		for (const token of tokenize(string)) {
			parsing.push(token);
		}

		return parsing.finish();
	}

	test("Encode grammar", (api) => {
		const {grammar} = getCraneGrammar(code);
		const hotGrammar = grammar.cook();


		const json = hotGrammar.grammar.toJSON();

		api.eq(json.productions.constructor.name, 'Array');
	});

	test("Decode grammar", (api) => {
		const {grammar} = getCraneGrammar(code);
		const hotGrammar = grammar.cook();


		const json = hotGrammar.grammar.toJSON();
		const Ctor = hotGrammar.grammar.constructor;

		const revivedGrammar = Ctor.fromJSON(json);
		const lrTable = generateParsingTable(revivedGrammar);
		const Parser = parserFactory(lrTable, hotGrammar.actions);

		api.eq(parse('5 * 3 + 2', Parser), 17);
	});


	test("Encode parsing table", (api) => {
		const {grammar} = getCraneGrammar(code);
		const hotGrammar = grammar.cook();

		const parsingTable = hotGrammar.generateParsingTable();

		const json = parsingTable.toJSON();

		api.eq(json.mappers.constructor.name, 'Array');
		api.eq(hotGrammar.grammar.terminals.size, json.gotoIndex);
	});

	test("Decode parsing table", (api) => {
		const {grammar} = getCraneGrammar(code);
		const hotGrammar = grammar.cook();

		const parsingTable = hotGrammar.generateParsingTable();

		const Ctor = parsingTable.constructor;
		const json = parsingTable.toJSON();
		const decoded = Ctor.fromJSON(json);
		const PreParser = parserFactory(parsingTable, hotGrammar.actions)
		const Parser = parserFactory(decoded, hotGrammar.actions);

		api.eq(parse('5 * 4 + 3', PreParser), 23);
		api.eq(parse('5 * 4 + 3', Parser), 23);
	});
}