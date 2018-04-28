
import ls from "livescript"
import {parseExpressionAt} from "acorn"
import {Parser} from "./parser.out"
import {sanitize} from "./postprocess"
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
function extractor(...props) {
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
        //console.log(`(return do ${params} => ${/\n/.test(code) ? '\n' : ''}${code})`);
        const c = ls.compile(`return do ${params} => ${/\n/.test(code) ? '\n' : ''}${code}`, {
            bare: true, 
            header: false
        });
        
        //console.log(c);
        //console.log();

        return parseExpressionAt(`function ($) {${c}}`, 0);
    } catch (e) {
        
        console.log(code);
        console.log(e);
        throw new Error('Cannot parse!');
    }
}

function toGrammar(code, rootName = null, ctxt = {}) {
	const vars = new Set();
	const precedence = [];
	const defs = new Queue();
	const list = [];
	const actionMap = new Map;
	const existing = new Set;
    const dependencies = [];
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
					production: [],
					code: '[]'
				},
				{
	                type: name,
	                production: [this.resolve(e)],
	                code: '[$[0]]'
	            }
            ]);


			if (sep)
				list.push({
                    type: name,
                    production: [name, this.resolve(sep), this.resolve(e)],
                    code: '[...$[0], $[2]]'
                });
			else
				list.push({
                    type: name,
                    production: [name, this.resolve(e)],
                    code: '[...$[0], $[1]]'
                });

            return name;
		},
		literal(tokens) {
			const name = this.newId();
		}
	};

	let i = 0;

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

            if (precedenceRegex.test(line.type)) {
				if (name.length > 0)
					throw new Error("Top-level precedence declarations only, please!");
				else {
                    const level = Object.assign({}, line, {type: precedenceMapper[line.type]});
					precedence.push(level);
				}
			}

			if (line.type === "definition") {
                const ntType = `${name}${name === '' ? '' : '.'}${line.name}`
				vars[line.name] = ntType;

                if (list.length === 0) {
                    list.push({
                        type: '$$$',
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
					productions.push(line);
				}
			}
            
            if (line.type === 'import') {
                dependencies.push(line);
            }
		}

		productions.forEach((p, li) => {
			const reformed = [];
            
            for (let e of p.production) {
                if (typeof e === 'string') {
                    reformed.push(vars[e] || e);
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
										name: e.name,
										args:
										  recursive ?
											e.args.map(e => this.preCompile(e, true)) :
											e.args 
									});

									return;
								}

								if (e.type === 'id') {
									const resolved = this.resolve(e.value);
									if (resolved === null)
										throw new Error(`Name ${e.value} cannot be resolved!`);
									else {
										newList.push(Object.assign({}, e, {value: resolved}));
									}

									return;
								}

								if (typeof e === 'string') {
									newList.push(e);
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
									if (typeof e === "string")
										return e;
									else
										throw new Error(`An OR list may only contain terminal types!`);
								})
							}
						}
					}

					const fn = context[e.name];
					const handle = fn.apply(localCtxt, e.args);

					if (handle in vars) {
						throw new Error();
					}

					reformed.push(handle);
				}

				if (e.type === 'id') {
					reformed.push(id.value);
				}
			}
            
			list.push({
                type: name,
                production: reformed,
                code: p.code,
                prec: typeof p.prec === 'string' ? p.prec : null
            });
		});
	}

	return {
        dependencies,
		actions: list.reduce((obj, {code}, i) =>
			((code ? obj[i] = compileLS(code) : null), obj), {}),
		grammar: new Grammar(
            list.map(extractor('type', 'production', 'prec')),
            0,
            precedence
        )
	}
}

// compiles a crane DSL string to a grammar and action table
// compatible with the crane API with the specified root production
export function compile(string, name, context) {
	const parsing = new Parser({source: string});
	let result = null;

	for (let token of sanitize(string + '\n')) {
		// console.log(token.type, token.string);
		parsing.push(token);
	}

	return toGrammar(parsing.finish(), name, context);
}


