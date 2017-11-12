
import {runInNewContext} from "vm"
import {readFileSync, readdirSync} from "fs"
import {rollup} from "rollup"
import {transform} from "babel-core"
import colors from "colors"
import generate, {Lexer} from "./src"


const {min, max, round, random} = Math;

const pass = colors.green('\u2714'), fail = colors.red('\u2718');

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

const language = (source) => {
    const grammar = depad(source);
    const name = 'fuckery';
    const parserSource = generate(grammar);
    const {code} = transform(parserSource, {
        plugins: ["transform-es2015-modules-commonjs"]
    });

    const context = {
        console,
        exports: {}
    };
    
    context.module = context;
 
    return {
        grammar,
        generated: (runInNewContext(code, context), context['exports']),
        parse(text) {
            const parsing = new this.generated.Parser(text);
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

            for (let token of lexer.tokenize(text)) {
                if (token.type !== 'ws') {
                    Object.setPrototypeOf(token, prototype);

                    parsing.push(token);
                }
            }

            return parsing.finish();
        }
    }
}

const lexer = new Lexer([
    {
        regex: /[\+\-\*\/\^\(\)\%\,]/
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
                        throw new Error(`Function failed to throw error!`);
                    }
                }
            });

            
            console.log(`${padded} ${pass} \t ${title.padEnd(40)} ${file}`);
        } catch (e) {
            console.log(e);
            console.log(`${padded} ${fail} \t ${title.padEnd(40)} ${file}`);
        }
    }
}

for (let node of readdirSync("./tests")) {
    if (node.endsWith('.js')) {
        file = node.slice(0, -3);
        runInNewContext(readFileSync(`${__dirname}/tests/${node}`, 'utf8'), context);    
    }
}