
/****************************
 * A lexer in under 100 lines of code
 * Dunno why, but felt like sharing
 ****************************/
export default class Lexer {
    constructor(patterns) {        
        this.patterns = patterns.map(o => Object.freeze(o));
        this.tokenPrototype = {
            get string() {
                return this.source.slice(...this.range);
            }
        };
        this._regex = this._getRegex(patterns);
        this._cache = new Map;
    }
    
    _getRegex(patterns = this.patterns) {
        let i = 0, concatenation = "";
        for (let {regex} of patterns) {
            if (i > 0)
                concatenation += '|';
            if (typeof regex === "string")
                concatenation += `(${regex})`;
            else
                concatenation += `(${regex.source})`;
            i++;
        }

        return `(?:${concatenation})`;
    }
    
    _getRemainingRegex(index, cache = this._cache) {
        if (cache.has(index)) {
            return cache.get(index);
        } else {
            const source = this._getRegex(this.patterns.slice(index + 1));
            const regex = new RegExp(source, 'y');
                        
            cache.set(index, regex);
            
            return regex;
        }
    }
    
    _match(regex, input, getContext, oldgex = regex) {
        
        let index = regex.lastIndex;
        let match = regex.exec(input);
        
        if (match === null)
            return this.patterns.length + 1;

        for (let i = 1; i < match.length; i++) {
            if (match[i] !== undefined) {
                
                const pattern = this.patterns[i - 1];
                const {test} = pattern;
                
                if (test && !test.apply(pattern, [getContext(match[0], index)])) {
                    const newgex = this._getRemainingRegex(i - 1);
                    newgex.lastIndex = index;
                    return i + this._match(newgex, input, getContext, oldgex);
                } else {
                    oldgex.lastIndex = regex.lastIndex;
                    return i - 1;
                }
            }
        }
    }
    
    // tokenize a complete input string
    * tokenize(str = '', start = 0, breaker = (t) => true) {
        const regex = new RegExp(this._regex, 'y');
        const token = (type, range, value = str.slice(...range)) => ({
            type,
            range,
            value,
            source: str,
        });
        
        const testContext = (match, start = 0) => Object.freeze({
            match,
            start,
            input: str,
            lexer: this,
            lastToken() {
                return lastToken;
            }
        });
                
        let i = regex.startIndex = start;
        let lastToken = null;
        while (i < str.length) {
            const start = regex.lastIndex;

            const index = this._match(regex, str, testContext);
            if (index === null || index > this.patterns.length)
                throw new Error("No valid matches found!");
            else {
                const match = str.slice(start, regex.lastIndex);            
                const pattern = this.patterns[index];
                const {fetch, type} = pattern;
                let value;

                i = regex.lastIndex;

                if (fetch) {
                    const getVal = () => str.slice(start, i);
                    const context = Object.freeze({
                        input: str,
                        lexer: this,
                        advanceTo(index) {
                            if (index < i) {
                                throw new Error("Cannot advance backwards!");
                            } else {
                                i = index;
                            }
                        },
                        next() {
                            const val = this.peek();

                            this.advanceTo(i + 1);

                            return val;
                        },
                        peek() {
                            if (i < str.length)
                                return str[i];
                            else
                                return null;
                        },
                        back(n = 1) {
                            if (i - n < regex.lastIndex) {
                                throw new Error('Cannot back up before start of string');
                            } else {
                                i -= n;
                            }
                        }
                    });

                    value = fetch.apply(pattern, [context, getVal]);
                }

                {
                    // create token, test it then (possibly) deliver it
                    const tkn =
                      (value === undefined) ?
                        token(type || match, [start, i]) :
                        token(type || match, [start, i], value);

                    if (breaker(tkn))
                        yield lastToken = tkn;
                    else
                        return;
                }

                regex.lastIndex = i;
            }
        }
    }
}