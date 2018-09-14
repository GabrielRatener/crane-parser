
import {createLexer} from "lexie"

const first = (regex, str) => str.match(regex)[1];

export function parseLn(str) {
    let pre = 0, post = 0, count = 0;

    for (let c of str) {
        if (c === '\n') {
            post = 0;
            count += 1;
        } else {
            if (count === 0)
                pre += 1;
            else
                post += 1;
        }
    }

    return {pre, post, count};
}

const lexer = createLexer([
    {
        regex: /[>\(\)\[\]\@\:\,\*]/
    },
    {
        regex: /''/,
        type: 'eps'
    },
    {
        regex: /\%(?:left|right|none)/,
        type: 'ass'
    },
    {
        regex: /%prec/,
        type: 'prec'
    },
    {
        regex: /%import/,
        type: 'import'
    },
    {
        regex: /%from/,
        type: 'from'
    },
    {
        regex: /[0-9]+/,
        type: 'int'
    },
    {
        regex: /(?:[\t ]*\n+[\t ]*)+/,
        type: 'endl'
    },
    {
        regex: /\s+/,
        type: 'ws'
    },
    {
        regex: /\\[^\n \t\(\)\[\]\{\}\,]+/,
        type: 'string'
    },
    {
        regex: /[A-Za-z_](?:[A-Za-z0-9_-]*)/,
        type: 'id'
    },
    {
        regex: /\#/,
        type: 'comment',
        fetch(stream) {
            while (stream.peek() !== null && stream.peek() !== '\n') {
                // keep looping until we reach end of file or end of line
                stream.next();
            }
        }
    },
    {
        regex: /"/,
        type: 'string',
        fetch (stream) {
            let escape = false;
            while (stream.peek()) {
                let c = stream.next();

                if (c === '"' && !escape)
                    return;

                if (escape)
                    escape = false;
                if (c === '\\')
                    escape = true;

            }

            throw new Error('Unexpected EOF!');
        }
    },
    {
        regex: /'/,
        type: 'string',
        fetch (stream) {
            let escape = false;
            while (stream.peek()) {
                let c = stream.next();

                if (c === "'" && !escape)
                    return;

                if (escape)
                    escape = false;
                if (c === '\\')
                    escape = true;

            }

            throw new Error('Unexpected EOF!');
        }
    },
    {
        regex: /\=\>/,
        type: 'code',
        fetch(stream, evaluate) {
            let leading = '';
            let trailing = '';

            let value = '';

            while (stream.peek()) {
                const c = stream.next();

                if (/\s/.test(c)) {
                    leading += c;
                } else {
                    value += c;
                    break;
                }
            }

            if (/^(\s*\n\s*)+$/.test(leading)) {
                // with linebreak
                const {post} = parseLn(leading);
                const wc = leading[leading.length - 1];
                const cleanup = (end = false) => {
                    const regex = new RegExp(`^[ \\t]{0,${post}}(.*)$`);

                    if (!end) {
                        stream.back();
                        stream.back();

                        while (/^[ \t\n]$/.test(stream.peek())) {
                            stream.back();
                        }

                        stream.next();
                    }

                    value = '\n' +
                      evaluate()
                        .split('\n')
                        .slice(1)
                        .map(str => str.length > post ?
                                wc + first(regex, str) : '')
                        .join('\n');
                };

                let indentMode = false;
                let indent = post;
                while (stream.peek()) {
                    const c = stream.next();
                    if (c === '\n') {
                        value += c;
                        trailing += c;
                        indentMode = true;
                        indent = 0;
                    } else if (/[\t ]/.test(c)) {
                        value += c;
                        trailing += c;
                        if (indentMode)
                            indent += 1;
                    } else {
                        trailing = '';
                        if (indentMode) {
                            if (indent < post) {
                                cleanup();

                                return value;
                            }
                        }

                        value += c;
                    }
                }
                cleanup(true);
            } else {
                // same line

                while (stream.peek()) {
                    const c = stream.next();

                    if (c === '\n') {
                        stream.back();
                        return value;
                    } else {
                        value += c;
                    }
                }
            }

            return value;
        }
    }
]);

export default lexer;

export function* lex(string) {
    let [line, column] = [1, 0];
    let offset = 0;

    const advanceTo = (index) => {
        for (let i = offset; i < index; i++) {
            if (string[i] === '\n') {
                line++;
                column = 0;
            } else {
                column++;
            }
        }
        offset = index;

        return {line, column};
    }
    
    for (const token of lexer.tokenize(string)) {
        const [start, end] = token.range.map(i => advanceTo(i));

        yield {
            ...token,
            loc: {start, end},
            get string() {
                return this.source.slice(...this.range);
            }
        };
    }
}
