
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

// patterns to match for a beginning or complete token
// for every string put in the first match is returned
const total = [
	{pattern: /[>\(\)\[\]\@\:\,\*]/},
	{pattern: "''", type: 'eps'},
	{
		pattern: /\%(?:left|right|none)/,
		type: 'ass'
	},
    {
        pattern: /%prec/,
        type: 'prec'
    },
    {
        pattern: /%import/,
        type: 'import'
    },
    {
        pattern: /%from/,
        type: 'from'
    },
    {
		pattern: /[0-9]+/,
		type: 'int'
	},
	{
		pattern: /(?:[\t ]*\n+[\t ]*)+/,
		type: 'endl'
	},
	{
		pattern: /\s+/,
		type: 'ws'
	},
	{
		pattern: /\\[^\n \t\(\)\[\]\{\}\,]+/,
		type: 'string'
	},
	{
		pattern: /[A-Za-z_](?:[A-Za-z0-9_-]*)/,
		type: 'id'
	},
    {
        pattern: /\#/,
        type: 'comment',
        fetch(cursor) {
            while (!cursor.end()) {
                let c = cursor.next();
                
                if (c === '\n') {
                    cursor.backward();
                    return;
                }
            }
        }
    },
	{
		pattern: '"',
		type: 'string',
		fetch (cursor) {
			let escape = false;
			this.string = '"';
			while (!cursor.end()) {
				let c = cursor.next();

				this.string += c;

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
		pattern: "'",
		type: 'string',
		fetch (cursor) {
			let escape = false;
			this.string = "'";
			while (!cursor.end()) {
				let c = cursor.next();

				this.string += c;

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
		pattern: '=>',
		type: 'code',
		fetch(cursor) {

			const add = (c) => (this.value += c, this.string += c);
			let leading = '';
			let trailing = '';
			this.value = '';
			this.string = '=>';


			while (!cursor.end()) {
				const c = cursor.next();
				this.string += c;

				if (/\s/.test(c)) {
					leading += c;
				} else {
					this.value += c;
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
                        cursor.backward();
                        cursor.backward();

                        while (/^[ \t\n]$/.test(cursor.peek())) {
                            cursor.backward();
                        }

                        cursor.next();
                    }

					this.value = '\n' +
					  this
						.string
						.split('\n')
						.slice(1)
						.map(str => str.length > post ?
								wc + first(regex, str) : '')
						.join('\n');
				};

				let indentMode = false;
				let indent = post;
				while (!cursor.end()) {
					const c = cursor.next();
					if (c === '\n') {
						add(c);
						trailing += c;
						indentMode = true;
						indent = 0;
					} else if (/[\t ]/.test(c)) {
						add(c);
						trailing += c;
						if (indentMode)
							indent += 1;
					} else {
						trailing = '';
						if (indentMode) {
							if (indent < post) {
								cleanup();

								return;
							}
						}

						add(c);
					}
				}
				cleanup(true);
			} else {
				// same line

				while (!cursor.end()) {
					const c = cursor.next();

					if (c === '\n') {
						cursor.backward();
						return;
					} else {
						add(c);
					}
				}
			}
		}
	}
];

export function Cursor(csrc) {
	var i = 0, apis = new Set();
	var x = 0, lines = [];
	var buffered = false, cbuff = [];
	var that = this;

	function getc(index) {
		let c = csrc.get(index);
		if (c === null) {
			throw new Error('Index out of range!');
		} else return c;
	}

	function add(c) {
		for (var api of apis) {
			api.add(c);
		}
	}

	function remove() {
		for (var api of apis) {
			api.remove();
		}
	}

	this.recorder = function() {
		var chars = [];

		var api = {
			add: function(c) {
				chars.push(c);
			},
			remove: function() {
				chars.pop();
			}
		};

		apis.add(api);

		return {
			done: function() {
				apis.delete(api);
				return chars.join("");
			}
		}
	}

    this.peek = function() {
        const c = getc(i);
        return c;
    }
    
	this.next = function() {
		var c = getc(i);
		this.forward(true);
		return c;
	}

	this.back = function() {
		this.backward(true);
		return getc(i);
	}

	this.forward = function(record) {
		var c = getc(i++);
		if (c === '\n') {
			lines.push(x);
			x = 0;
		} else {
			x++;
		}

		if (record) add(c);
	}

	this.backward = function(record) {
		var c = getc(--i);
		if (c === '\n') {
			x = lines.pop();
		} else {
			x--;
		}
		if (record) remove();
	}

	this.end = function() {
		return csrc.get(i) === null;
	}

	this.position = function() {
		return [x, lines.length];
	}
}

export class Token {
	constructor(string, type, pos) {
		this.position = pos || [null, null];
		this.begin = false;
		this.string = string;
		this.type = type || string;
		this.rule = null;
	}

	fetch(cursor) {
		return this.rule.fetch.apply(this, [cursor]);
	}
}

function getInterpolationTokens(cursor) {
	var tokens = [], indent = 0;
	for (let token of getTokensFromCursor(cursor)) {
		if (token.type === 'EOF') {
			throw new Error("Unexpected EOF!!!");
		}

		if (token.type === '{')  {
			indent++;
		}

		if (token.type === '}') {
			if (indent === 0) {
				return tokens;
			} else {
				indent--;
			}
		}

		tokens.push(token);
	}
}

export function* getTokensFromCursor(cursor) {
	var
	pos         = [0, 0],
	match 		= null,
	prevmatch 	= null,
	threshold 	= 3,
	stress 		= 0,
	trail		= [],
	token 		= "";

	while (!cursor.end()) {
		let
		c = cursor.next(),
		ended = cursor.end();

		token += c;
		match = findMatch(token, trail, prevmatch);

		if (ended) {
			if (match) { // last token to be generated
			    match.position = pos;
				trail.push(match.type);
				yield match;
				break;
			} else if (prevmatch === null) {
				throw new Error("No tokens found!");
			}
		}

		if (match === null) {
			if (prevmatch !== null) {

				stress++;
				if (stress === threshold || ended){
					while (stress > 0) {
						cursor.back();
						stress--;
					}

					if (prevmatch.begin)
						prevmatch.fetch(cursor);

					prevmatch.position = pos;
                    pos = cursor.position();

					trail.push(prevmatch.type);
					yield prevmatch;

					prevmatch = null;
					token = "";
				}
			}
		} else {
			stress = 0;
			prevmatch = match;
		}
	}
}

function hardmatch(reggie, string) {
	var match = string.match(reggie);
	return match !== null && string === match[0];
}

function findMatch(text, trail, prev) {
	if (prev !== null && prev.rule.final)
		return null;

	for (var i = 0; i < total.length; i++) {
		let rule = total[i];
		if (rule.pattern instanceof RegExp) {
			if (!hardmatch(rule.pattern, text))
				continue;
		} else {
			if (rule.pattern !== text)
				continue;
		}

		if ('test' in rule) {
			if (!rule.test(text, trail, prev))
				continue;
		}

		let token;
		if ('fetch' in rule) {
			token = new Token(text, rule.type);
			token.begin = true;
			token.rule = rule;
			return token;
		} else {
			if ('type' in rule) {
				if (rule.type instanceof Function) {
					token = new Token(text, rule.type(text))
				} else {
					token = new Token(text, rule.type);
				}
			} else {
				token = new Token(text);
			}

			token.rule = rule;
		}

		if ('process' in rule) {
			rule.process(token);
		}

		return token;
	}

	return null;
}

export function scan(csrc) {
	var cursor = new Cursor(csrc);
	return getTokensFromCursor(cursor);
}