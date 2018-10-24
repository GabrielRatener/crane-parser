
import vm from "vm"
import path from "path"
import fs from "fs"
import babel from "babel-core"
import colors from "colors"
import Lexer from "lexie"
import generate, {parserFactory, read} from "./src"

const {min, max, round, random} = Math;

const pass = colors.green('\u2714'), fail = colors.red('\u2718');

const dirname = path.dirname(new URL(import.meta.url).pathname);

const depad = (str) => {
    const lined = str.split('\n');
    const reducer = (acc, val) =>
        !val.trim() ?
          acc : 
          min(val.match(/^[\t ]*/)[0].length, acc) ;
    const space = lined.reduce(reducer, Infinity);
    
    return lined
        .map(line => line.trim() ? line.slice(space) : '')
        .join('\n');
}

const getCraneGrammar = (source, opts) => {
    const grammar = depad(source);
    const logs = [];
    const options = {
        ...opts,
        debug: true,
        logger: {
            log(...args) {
                logs.push(args);
            }
        }
    };
    
    return {
        grammar: read(grammar, options),
        log() {
            for (const log of logs) {
                console.log(...log);
            }
        }
    }
}

const tokenize = function* (text) {
    const prototype = {
        get loc() {
            const begin = {
                line: 1,
                column: 0
            };

            return {
                start: begin,
                end: begin
            };
        },
        get string() {
            return this.source.slice(...this.range);
        }
    };

    for (const token of lexer.tokenize(text)) {
        if (token.type === 'ws')
            continue;

        Object.setPrototypeOf(token, prototype);

        yield token;
    }
}

const language = (source) => {
    const grammar = depad(source);
    const name = 'fuckery';
    const logs = [];
    const options = {
        debug: true,
        logger: {
            log(...args) {
                logs.push(args);
            }
        }
    };
    const parserSource = generate(grammar, options);
    const {code} = babel.transform(parserSource, {
        plugins: ["transform-es2015-modules-commonjs"]
    });

    const context = {
        console,
        exports: {}
    };
    
    context.module = context;
 
    return {
        grammar,
        generated: (vm.runInNewContext(code, context), context['exports']),
        parse(text, debug = false) {
            // TODO: debug this

            const parsing = new this.generated.Parser();
   
            const showStack = () => {
                if (debug) {
                    const [start, ...states] = parsing.states.slice(0);
                    const stack = parsing.stack.slice(0);
                    let both = [];

                    for (let i = 0; i < stack.length; i++) {
                        const symbol = this.generated.untranslate(stack[i]);

                        both.push(`${colors.blue(symbol)} ${states[i]}`);
                    }

                    console.log(`${start} ${both.join(' ')}`);
                }
            }


            parsing.onreduceend = () => {
                if (debug)
                    console.log('now')
                showStack();
            }

            showStack();

            for (let token of tokenize(text)) {
                parsing.push(token);
                showStack();
            }

            return parsing.finish();
        },

        log() {
            for (const log of logs) {
                console.log(...log);
            }
        }
    }
}

const lexer = new Lexer([
    {
        regex: /[\+\-\*\/\^\(\)\%\,\|\&\[\]\{\}]/
    },
    {
        regex: /[0-9]+/,
        type: 'int'
    },
    {
        regex: /[\t ]+/,
        type: 'ws'
    },
    {
        regex: /[a-z]+/,
        type: 'id'
    }
]);

let i = 0;

let file = null;

const context = {
    console,
    language,
    tokenize,
    parserFactory,
    getCraneGrammar,
    languages: {},
    test(title, fn) {
        const padded = (++i + '').padEnd(4);
        try {
            fn({
                assert(condition) {
                    if (!condition) {
                        throw new Error(`Assertion error!`);
                    }  
                },
                eq(a, b) {
                    if (a !== b) {
                        throw new Error(`Values not equal: ${a}, ${b}!`);
                    }
                },
                throws(fn) {
                    try {
                        fn();
                    } catch (e) {
                        return;
                    }

                    throw new Error(`Function failed to throw error!`);
                }
            });

            
            console.log(`${padded} ${pass} \t ${title.padEnd(40)} ${file}`);
        } catch (e) {
            console.log(e);
            console.log(`${padded} ${fail} \t ${title.padEnd(40)} ${file}`);
        }
    }
}

for (let node of fs.readdirSync("./tests")) {
    if (node.endsWith('.js')) {
        file = node.slice(0, -3);
        vm.runInNewContext(fs.readFileSync(`${dirname}/tests/${node}`, 'utf8'), context);    
    }
}