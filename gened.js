const gotoStart = 9;
const translations = map({
    'G': 9,
    'E': 10,
    '$': 0,
    'int': 1,
    '+': 2,
    '-': 3,
    '*': 4,
    '/': 5,
    '^': 6,
    '(': 7,
    ')': 8
});
const productions = [
    [
        9,
        1
    ],
    [
        10,
        1
    ],
    [
        10,
        3
    ],
    [
        10,
        3
    ],
    [
        10,
        3
    ],
    [
        10,
        3
    ],
    [
        10,
        3
    ],
    [
        10,
        3
    ]
];
const reducers = map({
    1: function ($) {
        return parseInt($[0]);
    },
    2: function ($) {
        return $[0] + $[2];
    },
    3: function ($) {
        return $[0] - $[2];
    },
    4: function ($) {
        return $[0] * $[2];
    },
    5: function ($) {
        return $[0] / $[2];
    },
    6: function ($) {
        return Math.pow($[0], $[2]);
    },
    7: function ($) {
        return $[1];
    }
}, parseInt);
const lrTable = {
    action: map({
        '0-1': 's2',
        '0-7': 's3',
        '1-0': 'r0',
        '1-2': 's4',
        '1-3': 's5',
        '1-4': 's6',
        '1-5': 's7',
        '1-6': 's8',
        '2-0': 'r1',
        '2-2': 'r1',
        '2-3': 'r1',
        '2-4': 'r1',
        '2-5': 'r1',
        '2-6': 'r1',
        '3-1': 's10',
        '3-7': 's11',
        '4-1': 's2',
        '4-7': 's3',
        '5-1': 's2',
        '5-7': 's3',
        '6-1': 's2',
        '6-7': 's3',
        '7-1': 's2',
        '7-7': 's3',
        '8-1': 's2',
        '8-7': 's3',
        '9-8': 's17',
        '9-2': 's18',
        '9-3': 's19',
        '9-4': 's20',
        '9-5': 's21',
        '9-6': 's22',
        '10-8': 'r1',
        '10-2': 'r1',
        '10-3': 'r1',
        '10-4': 'r1',
        '10-5': 'r1',
        '10-6': 'r1',
        '11-1': 's10',
        '11-7': 's11',
        '12-0': 'r2',
        '12-2': 'r2',
        '12-3': 'r2',
        '12-4': 's6',
        '12-5': 's7',
        '12-6': 's8',
        '13-2': 'r3',
        '13-6': 's8',
        '13-3': 'r3',
        '13-4': 's6',
        '13-5': 's7',
        '13-0': 'r3',
        '14-2': 'r4',
        '14-3': 'r4',
        '14-6': 's8',
        '14-4': 'r4',
        '14-5': 'r4',
        '14-0': 'r4',
        '15-2': 'r5',
        '15-3': 'r5',
        '15-4': 'r5',
        '15-6': 's8',
        '15-5': 'r5',
        '15-0': 'r5',
        '16-2': 'r6',
        '16-3': 'r6',
        '16-4': 'r6',
        '16-5': 'r6',
        '16-6': 's8',
        '16-0': 'r6',
        '17-2': 'r7',
        '17-6': 'r7',
        '17-5': 'r7',
        '17-4': 'r7',
        '17-3': 'r7',
        '17-0': 'r7',
        '18-1': 's10',
        '18-7': 's11',
        '19-1': 's10',
        '19-7': 's11',
        '20-1': 's10',
        '20-7': 's11',
        '21-1': 's10',
        '21-7': 's11',
        '22-1': 's10',
        '22-7': 's11',
        '23-8': 's29',
        '23-2': 's18',
        '23-3': 's19',
        '23-4': 's20',
        '23-5': 's21',
        '23-6': 's22',
        '24-8': 'r2',
        '24-2': 'r2',
        '24-3': 'r2',
        '24-4': 's20',
        '24-5': 's21',
        '24-6': 's22',
        '25-2': 'r3',
        '25-6': 's22',
        '25-3': 'r3',
        '25-4': 's20',
        '25-5': 's21',
        '25-8': 'r3',
        '26-2': 'r4',
        '26-3': 'r4',
        '26-6': 's22',
        '26-4': 'r4',
        '26-5': 'r4',
        '26-8': 'r4',
        '27-2': 'r5',
        '27-3': 'r5',
        '27-4': 'r5',
        '27-6': 's22',
        '27-5': 'r5',
        '27-8': 'r5',
        '28-2': 'r6',
        '28-3': 'r6',
        '28-4': 'r6',
        '28-5': 'r6',
        '28-6': 's22',
        '28-8': 'r6',
        '29-2': 'r7',
        '29-6': 'r7',
        '29-5': 'r7',
        '29-4': 'r7',
        '29-3': 'r7',
        '29-8': 'r7'
    }),
    goto: map({
        '0-10': 1,
        '3-10': 9,
        '4-10': 12,
        '5-10': 13,
        '6-10': 14,
        '7-10': 15,
        '8-10': 16,
        '11-10': 23,
        '18-10': 24,
        '19-10': 25,
        '20-10': 26,
        '21-10': 27,
        '22-10': 28
    })
};
const reduce = (p, args) => {
    if (reducers.has(p)) {
        const fn = reducers.get(p);
        return fn(args);
    } else {
        return args.length > 0 ? args[0] : [];
    }
};
function map(obj, kFunc = k => k) {
    const mp = new Map();
    for (let key in obj)
        if (obj.hasOwnProperty(key))
            mp.set(kFunc(key), obj[key]);
    return mp;
}
export function accepts(token) {
    return translations.has(token) && translations.get(token) < gotoStart;
}
export class Parser {
    constructor(source = '') {
        this.source = '';
        this.states = [0];
        this.stack = [];
        this.values = [];
        this.addSource(source);
    }
    showErr({row, column}, err) {
        const lines = this.source.split('\n');
        if (row <= lines.length && column < lines[row - 1].length) {
            const line = lines[row - 1];
            let ws = '';
            for (let c of line) {
                if (c === '\t') {
                    ws += '\t';
                } else {
                    ws += ' ';
                }
            }
            throw new Error(`${ err.name }: ${ err.message }\n\n${ line }\n${ ws }^\n`);
        } else {
            throw err;
        }
    }
    _state() {
        return this.states[this.states.length - 1];
    }
    addSource(txt) {
        this.source += txt;
    }
    push(token) {
        if (token.type === '$')
            throw Error(`Unexpected token "$", always use "finish" to complete parsing`);
        if (!translations.has(token.type) || translations.get(token.type) >= gotoStart)
            throw Error(`Invalid token type "${ token.type }"`);
        else {
            const type = translations.get(token.type);
            while (true) {
                const key = `${ this._state() }-${ type }`;
                if (lrTable.action.has(key)) {
                    const val = lrTable.action.get(key);
                    const action = val[0];
                    const number = parseInt(val.slice(1));
                    if (action === 's') {
                        this.states.push(number);
                        this.stack.push(type);
                        this.values.push(token.value);
                        return;
                    }
                    if (action === 'r') {
                        const [symbol, length] = productions[number];
                        this.states.splice(-length);
                        this.states.push(lrTable.goto.get(`${ this._state() }-${ symbol }`));
                        this.stack.splice(-length);
                        this.stack.push(symbol);
                        this.values.push(reduce(number, this.values.splice(-length)));
                        continue;
                    }
                } else {
                    this.showError(token.loc, new Error(`Unexpected token "${ token.type }"`));
                }
            }
        }
    }
    finish() {
        const type = translations.get('$');
        while (true) {
            const key = `${ this._state() }-${ type }`;
            if (lrTable.action.has(key)) {
                const val = lrTable.action.get(key);
                const action = val[0];
                const number = parseInt(val.slice(1));
                if (action !== 'r')
                    throw new Error(`Can only reduce when lookahead is EOF`);
                if (number === 0)
                    return this.values[0];
                else {
                    const [symbol, length] = productions[number];
                    this.states.splice(-length);
                    this.states.push(lrTable.goto.get(`${ this._state() }-${ symbol }`));
                    this.stack.splice(-length);
                    this.stack.push(symbol);
                    this.values.push(reduce(number, this.values.splice(-length)));
                    continue;
                }
            } else {
                throw new Error(`Unexpected token: "${ token.type }"`);
            }
        }
    }
}