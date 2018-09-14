
import ls from "livescript"
import acorn from "acorn"
import {Parser} from "./parser.out"
import {tokenize} from "./postprocess"
import {SubSet, Queue} from "../collections"
import Grammar from "../grammar"
import {LEFT, RIGHT, NONE, PrecedenceTable} from "../precedence"

const precedenceMapper = {
	left: LEFT,
	right: RIGHT,
	none: NONE
};

const precedenceRegex = /^(?:left|right|none)$/;

// returns object containing only specified properties of object passed in
export function extractor(...props) {
    return (o) => props.reduce((obj, prop) => (obj[prop] = o[prop], obj), {});
}

function expand(prod, code) {
	let prods = [[]];
	for (let e of prod) {
		if (e.type === 'OrExpression') {
			const [...all] = prods;
			prods = [];
			e.list.forEach(exp => {
				all.forEach(prod => {
					prods.push([...prod, exp]);
				});
			});

			continue;
		}

		prods.forEach(p => {
			p.push(e);
		});
	}

	return prods.map(([type, production]) => ({type, production, code}));
}


export function compileLS(code, aliases = new Map()) {
    const aliasList = [];
    
    for (let [index, name] of aliases) {
        while (index >= aliasList.length) {
            aliasList.push('');
        }
        
        aliasList[index] = name;
    }
    
    try {
        const params = aliasList.length > 0 ? `([${aliasList.join(',')}] = $)` : '';
        const c = ls.compile(`return do ${params} => ${/\n/.test(code) ? '\n' : ''}${code}`, {
            bare: true, 
            header: false
        });
        
        //console.log(c);
        //console.log();

        return acorn.parseExpressionAt(`function ($, $loc, $rule) {${c}}`, 0);
    } catch (e) {
        
        console.log(code);
        console.log(e);
        throw new Error('Cannot parse!');
    }
}

export function toGrammar(code, rootName = null, ctxt = {}) {
	const vars = new Set();
	const precedence = [];
	const defs = new Queue();
	const list = [];
	const actionMap = new Map;
	const existing = new Set;
    const dependencies = [];
    const toString = (e) => e.type === 'id' ? e.name : e.value;
	const final = {
		grammar: null,
		actions: {}
	};

	const context = {
		// TODO: add @additional and @questionable

		multiple([e], [sep] = [null]) {
			const name = this.newId();

			list.push(...[
				{
					type: name,
					line: sourceLine,
					production: [],
					code: '[]'
				},
				{
	                type: name,
					line: sourceLine,
	                production: [this.resolve(toString(e))],
	                code: '[$[0]]'
	            }
            ]);

			if (sep)
				list.push({
                    type: name,
					line: sourceLine,
                    production: [name, this.resolve(toString(sep)), this.resolve(toString(e))],
                    code: '[...$[0], $[2]]'
                });
			else
				list.push({
                    type: name,
					line: sourceLine,
                    production: [name, this.resolve(toString(e))],
                    code: '[...$[0], $[1]]'
                });

            return name;
		}
	};

	let i = 0;
	let sourceLine = 0;

	for (let variable in ctxt) {
		if (ctxt.hasOwnProperty(variable)) {
			context[variable] = ctxt[variable];
		}
	}

	defs.enqueue({
		body: code,
		name: '',
		vars: {}
	});

	while (defs.length > 0) {
		const {body, name, vars} = defs.dequeue();
		const productions = [];
		const actions = {};
        
		for (let line of body) {
			sourceLine = line.loc ? line.loc.start.line : sourceLine;

            if (precedenceRegex.test(line.type)) {
				if (name.length > 0)
					throw new Error("Top-level precedence declarations only, please!");
				else {
                    const level = Object.assign({}, {
                    	tokens: line.tokens.map(t => t.value),
                   		type: precedenceMapper[line.type]
                    });
					precedence.push(level);
				}
			}

			if (line.type === "definition") {
                const ntType = `${name}${name === '' ? '' : '.'}${line.name.name}`
				vars[line.name.name] = ntType;

                if (list.length === 0) {
                    list.push({
                        type: '$$$',
                        line: sourceLine,
                        production: [rootName || ntType],
                        code: '$[0]'
                    });
                }
                
				defs.enqueue({
					body: line.body,
					name: ntType,
					vars: Object.create(vars)
				});
			}

			if (line.type === 'production') {
				if (name.length === 0) {
					throw new Error("Top level productions not allowed!");
				} else {
					productions.push({line: sourceLine, ...line});
				}
			}
            
            if (line.type === 'import') {
                dependencies.push({line: sourceLine, ...line});
            }
		}

		productions.forEach((p, li) => {
			const reformed = [];
            
            for (let e of p.production) {
                if (e.type === 'string') {
                    reformed.push(e.value);
                }
                
				if (e.type === 'call') {
					const localCtxt = {
						newId() {
							return `$__${++i}`;
						},
						resolve(name) {

							if (name in vars) {
								return vars[name];
							} else {
								return name;
							}
						},
                        
						// The recursive flag will determine whether expression lists
						// passed into function calls are also resolved
						preCompile(expressionList, recursive = true) {
							const newList = [];
							expressionList.forEach(e => {
								if (e.type === 'call') {
									newList.push({
										type: 'call',
										name: e.name.name,
										args:
										  recursive ?
											e.args.map(e => this.preCompile(e, true)) :
											e.args
									});

									return;
								}

								if (e.type === 'id') {
									const resolved = this.resolve(e.name);
									if (resolved === null)
										throw new Error(`Name ${e.name} cannot be resolved!`);
									else {
										newList.push(Object.assign({}, e.name, {value: resolved}));
									}

									return;
								}

								if (e.type === 'string') {
									newList.push(e.value);
									return;
								}

								if (typeof e === 'or') {

								}
							});
						},
						compileOr(el) {
							return {
								type: 'or',
								list: el.list.map(e => {
									if (e.type === "string")
										return e.value;
									else
										throw new Error(`An OR list may only contain terminal types!`);
								})
							}
						}
					}

					const fn = context[e.name.name];
					const handle = fn.apply(localCtxt, e.args);

					if (handle in vars) {
						throw new Error(`Handle conflict error ${handle}`);
					}

					reformed.push(handle);
				}

				if (e.type === 'id') {
					if (e.name in vars)
						reformed.push(vars[e.name]);
					else
						throw new Error(`Non-terminal "${e.name}" not defined`);
				}
			}
            
			list.push({
                type: name,
                line: p.line,
                production: reformed,
                code: p.code,
                prec: typeof p.prec === 'string' ? p.prec : null
            });
		});
	}

	//console.log(JSON.stringify(list, null, 4));

	return {
        dependencies,
        sourceLineMapping: list.map(p => p.line),
		actions: list.reduce((obj, {code}, i) =>
			((code ? obj[i] = compileLS(code) : null), obj), {}),
		grammar: new Grammar(
            list.map(extractor('type', 'production', 'prec')),
            0,
            precedence
        )
	}
}

function getLoc({source, range}) {
	const list = [];
	let [line, column] = [1, 0];
	let i = 0;
	for (const c of source) {
		if (i === range[list.length]) {
			list.push({line, column});
			if (list.length === range.length) {
				const [start, end] = list;
				return {start, end};
			}
		}

		if (c === '\n') {
			line++;
			column = 0;
		} else {
			column++;
		}

		i++;
	}
}

// compiles a crane DSL string to a grammar and action table
// compatible with the crane API with the specified root production
export function compile(string, name, additional = {}) {
	const context = {
		node: new Proxy({}, {
			get(_, type) {
				return (obj) => ({
					type,
					loc,
					...obj
				});
			},
			apply(_, ctxt, [obj]) {
				return {
					loc,
					...obj
				};
			}
		}),
		...additional
	};

	const parsing = new Parser({context, source: string});
	let loc = null, result = null;

	parsing.onreducestart = (data) => {
		//console.log(data.loc);
		loc = data.loc;
	}

	for (let token of tokenize(string + '\n')) {
		try {
			parsing.push(token);
		} catch (e) {
			const {line, column} = getLoc(token).start;
			throw new Error(`${e.message} @${line}:${column}`);
		}
	}

	return toGrammar(parsing.finish(), name, context);
}


