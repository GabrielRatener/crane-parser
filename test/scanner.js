
// patterns to match for a beginning or complete token
// for every string put in the first match is returned
const total = [
	{
		pattern: /[0-9]+/,
		tag: 'int'
	},
	{
		pattern: /\s+/,
		tag: 'ws'
	},
	{pattern: "+"},
	{pattern: "-"},
	{pattern: "*"},
	{pattern: "/"},
	{pattern: "^"},
	{pattern: "("},	
	{pattern: ")"},	
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

export function Token(value, tag, pos) {
	this.position = pos || [null, null];
	this.begin = false;
	this.value = value;
	this.tag = tag || value;
	this.rule = null;
	this.getPosition = function() {
	    var
	    x = this.position[0],
	    y = this.position[1];
	    for(let i = 0; i < value.length; i++) {
	        let c = value[i];
	        if (c === '\n') {
	            x = 0;
	            y++;
	        } else {
	            x++;
	        }
	    }

	    return {
            first_column: this.position[0],
            first_line: this.position[1],
            last_column: x,
            last_line: y
	    }
	}
}

Token.prototype.fetch = function(cursor) {
	return this.rule.fetch.apply(this, [cursor]);
}

function getInterpolationTokens(cursor) {
	var tokens = [], indent = 0;
	for (let token of getTokensFromCursor(cursor)) {
		if (token.tag === 'EOF') {
			throw new Error("Unexpected EOF!!!");
		}

		if (token.tag === '{')  {
			indent++;
		}

		if (token.tag === '}') {
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
				trail.push(match.tag);
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

					trail.push(prevmatch.tag);
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
			token = new Token(text, rule.tag);
			token.begin = true;
			token.rule = rule;
			return token;
		} else {
			if ('tag' in rule) {
				if (rule.tag instanceof Function) {
					token = new Token(text, rule.tag(text))
				} else {
					token = new Token(text, rule.tag);
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

export function getTokensFromSource(csrc) {
	var cursor = new Cursor(csrc);
	return getTokensFromCursor(cursor);
}