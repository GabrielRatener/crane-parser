
import {StringSource} from "./source"
import {scan, parseLn} from "./scanner"
import {Queue} from "../collections"

function* locate(tokens) {
	let location = {
		line: 1,
		column: 0
	};

	for (let token of tokens) {
		const start = location;
		const {pre, post, count} = parseLn(token.string);
		if (count > 0) {
			location = {
				line: start.line + count,
				column: post
			}
		} else {
			location = {
				line: start.line,
				column: start.column + token.string.length 
			}
		}

		token.loc = {start, end: location};

		yield token;
	}
}

function empty(type, loc, value = '') {
	return {string: '', type, value, loc};
}

export function raw(string) {
    const src = new StringSource(string);
    
    return scan(src);
}

export function* sanitize(string) {
	const src = new StringSource(string);
	const top = () => indents.length > 0 ? indents[indents.length - 1] : 0;
    const iter = locate(scan(src));
    const tq = new Queue();
    const getNext = () => {
        const {done, value} = iter.next();
        
        if (done)
            return null;
        else
            return value;
    }
    
    let prev = null, indents = [], i = 0;
	let loc;
    
    tq.enqueue(getNext());
    tq.enqueue(getNext());
    
	loop:while(true) {
        const [token, next] = [tq.dequeue(), tq.dequeue()];
		loc = token.loc;
		switch(token.type) {
			case 'ws':
            case 'comment':
				break;
			case 'endl':
				if (next && next.type === 'comment')
                    break;
                else {
                    const {post} = parseLn(token.string);

                    if (i === 0)
                        break;
                    if (post > top()) {
                        indents.push(post);
                        yield empty('indent', loc);
                        break;
                    } else if (post < top()) {
                        while (post < top()) {
                            indents.pop();
                            yield empty('dedent', loc);
                        }
                        yield empty('endl', loc, '\n');
                        break;
                    }
                }
			default:
				yield token;
		}
        
        if (next === null)
            break;
        else {
            tq.enqueue(next);
            tq.enqueue(getNext());
        }
        
		i++;
	}

	while (indents.length > 0) {
		indents.pop();
		yield empty('dedent', loc);
	}
}