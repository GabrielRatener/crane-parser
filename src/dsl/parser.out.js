const {min, max} = Math;
const gotoStart = 21;
const translations = map({
    'Root': 21,
    'Grammar': 22,
    'Body': 23,
    'Specifier': 24,
    'SpecifierList': 25,
    'Import': 26,
    'BodyLine': 27,
    'String': 28,
    'StringList': 29,
    'Precedence': 30,
    'Expression': 31,
    'ExpressionList': 32,
    'AttributeList': 33,
    'Attribute': 34,
    'Production': 35,
    'DefLine': 36,
    'DefLines': 37,
    'Def': 38,
    'Args': 39,
    'CallExpression': 40,
    'OrList': 41,
    'OrExpression': 42,
    '$': 0,
    'endl': 1,
    'id': 2,
    ':': 3,
    'import': 4,
    'from': 5,
    '*': 6,
    'string': 7,
    'ass': 8,
    'prec': 9,
    '>': 10,
    'code': 11,
    'eps': 12,
    'indent': 13,
    'dedent': 14,
    ',': 15,
    '@': 16,
    '(': 17,
    ')': 18,
    '[': 19,
    ']': 20
});
const productions = [
    [
        21,
        1
    ],
    [
        22,
        1
    ],
    [
        22,
        2
    ],
    [
        23,
        1
    ],
    [
        23,
        3
    ],
    [
        24,
        1
    ],
    [
        24,
        3
    ],
    [
        25,
        1
    ],
    [
        25,
        2
    ],
    [
        26,
        5
    ],
    [
        26,
        6
    ],
    [
        26,
        4
    ],
    [
        27,
        1
    ],
    [
        27,
        1
    ],
    [
        27,
        1
    ],
    [
        28,
        1
    ],
    [
        29,
        1
    ],
    [
        29,
        2
    ],
    [
        30,
        2
    ],
    [
        30,
        2
    ],
    [
        31,
        1
    ],
    [
        31,
        1
    ],
    [
        31,
        1
    ],
    [
        31,
        1
    ],
    [
        32,
        1
    ],
    [
        32,
        2
    ],
    [
        33,
        1
    ],
    [
        33,
        3
    ],
    [
        34,
        2
    ],
    [
        35,
        2
    ],
    [
        35,
        3
    ],
    [
        35,
        2
    ],
    [
        35,
        3
    ],
    [
        36,
        1
    ],
    [
        36,
        1
    ],
    [
        36,
        3
    ],
    [
        37,
        1
    ],
    [
        37,
        3
    ],
    [
        38,
        4
    ],
    [
        39,
        1
    ],
    [
        39,
        3
    ],
    [
        40,
        5
    ],
    [
        41,
        1
    ],
    [
        41,
        2
    ],
    [
        42,
        3
    ]
];
const reducers = map({
    3: $ => {
        return [$[0]];
    },
    4: $ => {
        return $[0].concat($[2]);
    },
    5: $ => {
        return {
            imported: $[0],
            local: $[0]
        };
    },
    6: $ => {
        return {
            imported: $[0],
            local: $[2]
        };
    },
    7: $ => {
        return [$[0]];
    },
    8: $ => {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    9: $ => {
        return {
            type: 'import',
            'default': $[2],
            path: $[4]
        };
    },
    10: $ => {
        return {
            type: 'import',
            all: $[3],
            path: $[5]
        };
    },
    11: $ => {
        return {
            type: 'import',
            dependencies: $[1],
            path: $[3]
        };
    },
    15: $ => {
        return $[0][0] === '"' ? $[0].slice(1, -1) : $[0].slice(1);
    },
    16: $ => {
        return [$[0]];
    },
    17: $ => {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    18: $ => {
        return {
            type: $[0].slice(1),
            tokens: $[1]
        };
    },
    19: $ => {
        return {
            type: $[0].slice(1),
            alias: $[1],
            tokens: []
        };
    },
    24: $ => {
        return [$[0]];
    },
    25: $ => {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    26: $ => {
        return [$[0]];
    },
    27: $ => {
        var slice$ = [].slice;
        return slice$.call($[$[0]]).concat([$[$[2]]]);
    },
    28: $ => {
        return {
            type: 'prec',
            value: $[1]
        };
    },
    29: $ => {
        return {
            type: 'production',
            production: $[1],
            code: null
        };
    },
    30: $ => {
        return {
            type: 'production',
            production: $[1],
            code: $[2]
        };
    },
    31: $ => {
        return {
            type: 'production',
            production: [],
            code: null
        };
    },
    32: $ => {
        return {
            type: 'production',
            production: [],
            code: $[2]
        };
    },
    35: $ => {
        var production, type, value;
        return production = $[2], function () {
            var i$, ref$, len$, ref1$, results$ = [];
            for (i$ = 0, len$ = (ref$ = $[0]).length; i$ < len$; ++i$) {
                ref1$ = ref$[i$], type = ref1$.type, value = ref1$.value;
                results$.push(production[type] = value);
            }
            return results$;
        }(), production;
    },
    36: $ => {
        return [$[0]];
    },
    37: $ => {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[2]]);
    },
    38: $ => {
        return {
            type: 'definition',
            name: $[0],
            body: $[2]
        };
    },
    39: $ => {
        return [$[0]];
    },
    40: $ => {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[2]]);
    },
    41: $ => {
        return {
            type: 'call',
            name: $[1],
            args: $[3]
        };
    },
    42: $ => {
        return [$[0]];
    },
    43: $ => {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    44: $ => {
        return {
            type: 'or',
            list: $[1]
        };
    }
}, parseInt);
const lrTable = {
    action: map({
        '0-4': 's5',
        '0-8': 's7',
        '0-2': 's9',
        '1-0': 'r0',
        '2-0': 'r1',
        '2-1': 's10',
        '3-0': 'r3',
        '3-1': 'r3',
        '4-0': 'r12',
        '4-1': 'r12',
        '5-3': 's11',
        '5-6': 's12',
        '5-2': 's15',
        '6-0': 'r13',
        '6-1': 'r13',
        '7-7': 's18',
        '7-2': 's19',
        '8-0': 'r14',
        '8-1': 'r14',
        '9-13': 's20',
        '10-4': 's5',
        '10-8': 's7',
        '10-2': 's9',
        '10-0': 'r2',
        '11-2': 's22',
        '12-3': 's23',
        '13-5': 's24',
        '13-2': 's15',
        '14-5': 'r7',
        '14-2': 'r7',
        '15-5': 'r5',
        '15-2': 'r5',
        '15-3': 's26',
        '16-0': 'r18',
        '16-1': 'r18',
        '16-7': 's18',
        '17-0': 'r16',
        '17-1': 'r16',
        '17-7': 'r16',
        '18-0': 'r15',
        '18-1': 'r15',
        '18-7': 'r15',
        '19-0': 'r19',
        '19-1': 'r19',
        '20-2': 's31',
        '20-10': 's33',
        '20-9': 's36',
        '21-0': 'r4',
        '21-1': 'r4',
        '22-5': 's37',
        '23-2': 's38',
        '24-7': 's40',
        '25-5': 'r8',
        '25-2': 'r8',
        '26-2': 's41',
        '27-0': 'r17',
        '27-1': 'r17',
        '27-7': 'r17',
        '28-14': 's42',
        '28-1': 's43',
        '29-14': 'r36',
        '29-1': 'r36',
        '30-14': 'r33',
        '30-1': 'r33',
        '31-13': 's44',
        '32-14': 'r34',
        '32-1': 'r34',
        '33-16': 's48',
        '33-19': 's50',
        '33-7': 's52',
        '33-2': 's53',
        '33-12': 's54',
        '34-1': 's55',
        '35-1': 'r26',
        '36-2': 's56',
        '37-7': 's40',
        '38-5': 's58',
        '39-0': 'r11',
        '39-1': 'r11',
        '40-0': 'r15',
        '40-1': 'r15',
        '41-5': 'r6',
        '41-2': 'r6',
        '42-0': 'r38',
        '42-1': 'r38',
        '43-2': 's31',
        '43-10': 's33',
        '43-9': 's36',
        '44-2': 's31',
        '44-10': 's33',
        '44-9': 's36',
        '45-14': 'r29',
        '45-1': 'r29',
        '45-16': 's48',
        '45-19': 's50',
        '45-7': 's52',
        '45-2': 's53',
        '45-11': 's62',
        '46-14': 'r24',
        '46-1': 'r24',
        '46-16': 'r24',
        '46-19': 'r24',
        '46-7': 'r24',
        '46-2': 'r24',
        '46-11': 'r24',
        '47-14': 'r20',
        '47-1': 'r20',
        '47-16': 'r20',
        '47-19': 'r20',
        '47-7': 'r20',
        '47-2': 'r20',
        '47-11': 'r20',
        '48-2': 's63',
        '49-14': 'r21',
        '49-1': 'r21',
        '49-16': 'r21',
        '49-19': 'r21',
        '49-7': 'r21',
        '49-2': 'r21',
        '49-11': 'r21',
        '50-7': 's66',
        '51-14': 'r22',
        '51-1': 'r22',
        '51-16': 'r22',
        '51-19': 'r22',
        '51-7': 'r22',
        '51-2': 'r22',
        '51-11': 'r22',
        '52-14': 'r15',
        '52-1': 'r15',
        '52-16': 'r15',
        '52-19': 'r15',
        '52-7': 'r15',
        '52-2': 'r15',
        '52-11': 'r15',
        '53-14': 'r23',
        '53-1': 'r23',
        '53-16': 'r23',
        '53-19': 'r23',
        '53-7': 'r23',
        '53-2': 'r23',
        '53-11': 'r23',
        '54-14': 'r31',
        '54-1': 'r31',
        '54-11': 's67',
        '55-10': 's33',
        '55-9': 's36',
        '56-1': 'r28',
        '57-0': 'r9',
        '57-1': 'r9',
        '58-7': 's40',
        '59-14': 'r37',
        '59-1': 'r37',
        '60-14': 's71',
        '60-1': 's43',
        '61-14': 'r25',
        '61-1': 'r25',
        '61-16': 'r25',
        '61-19': 'r25',
        '61-7': 'r25',
        '61-2': 'r25',
        '61-11': 'r25',
        '62-14': 'r30',
        '62-1': 'r30',
        '63-17': 's72',
        '64-20': 's73',
        '64-7': 's66',
        '65-20': 'r42',
        '65-7': 'r42',
        '66-20': 'r15',
        '66-7': 'r15',
        '67-14': 'r32',
        '67-1': 'r32',
        '68-14': 'r35',
        '68-1': 'r35',
        '69-1': 'r27',
        '70-0': 'r10',
        '70-1': 'r10',
        '71-14': 'r38',
        '71-1': 'r38',
        '72-16': 's79',
        '72-19': 's81',
        '72-7': 's83',
        '72-2': 's84',
        '73-14': 'r44',
        '73-1': 'r44',
        '73-16': 'r44',
        '73-19': 'r44',
        '73-7': 'r44',
        '73-2': 'r44',
        '73-11': 'r44',
        '74-20': 'r43',
        '74-7': 'r43',
        '75-18': 's85',
        '75-15': 's86',
        '76-18': 'r39',
        '76-15': 'r39',
        '76-16': 's79',
        '76-19': 's81',
        '76-7': 's83',
        '76-2': 's84',
        '77-18': 'r24',
        '77-16': 'r24',
        '77-19': 'r24',
        '77-7': 'r24',
        '77-2': 'r24',
        '77-15': 'r24',
        '78-18': 'r20',
        '78-16': 'r20',
        '78-19': 'r20',
        '78-7': 'r20',
        '78-2': 'r20',
        '78-15': 'r20',
        '79-2': 's88',
        '80-18': 'r21',
        '80-16': 'r21',
        '80-19': 'r21',
        '80-7': 'r21',
        '80-2': 'r21',
        '80-15': 'r21',
        '81-7': 's66',
        '82-18': 'r22',
        '82-16': 'r22',
        '82-19': 'r22',
        '82-7': 'r22',
        '82-2': 'r22',
        '82-15': 'r22',
        '83-18': 'r15',
        '83-16': 'r15',
        '83-19': 'r15',
        '83-7': 'r15',
        '83-2': 'r15',
        '83-15': 'r15',
        '84-18': 'r23',
        '84-16': 'r23',
        '84-19': 'r23',
        '84-7': 'r23',
        '84-2': 'r23',
        '84-15': 'r23',
        '85-14': 'r41',
        '85-1': 'r41',
        '85-16': 'r41',
        '85-19': 'r41',
        '85-7': 'r41',
        '85-2': 'r41',
        '85-11': 'r41',
        '86-16': 's79',
        '86-19': 's81',
        '86-7': 's83',
        '86-2': 's84',
        '87-18': 'r25',
        '87-16': 'r25',
        '87-19': 'r25',
        '87-7': 'r25',
        '87-2': 'r25',
        '87-15': 'r25',
        '88-17': 's91',
        '89-20': 's92',
        '89-7': 's66',
        '90-18': 'r40',
        '90-15': 'r40',
        '90-16': 's79',
        '90-19': 's81',
        '90-7': 's83',
        '90-2': 's84',
        '91-16': 's79',
        '91-19': 's81',
        '91-7': 's83',
        '91-2': 's84',
        '92-18': 'r44',
        '92-16': 'r44',
        '92-19': 'r44',
        '92-7': 'r44',
        '92-2': 'r44',
        '92-15': 'r44',
        '93-18': 's94',
        '93-15': 's86',
        '94-18': 'r41',
        '94-16': 'r41',
        '94-19': 'r41',
        '94-7': 'r41',
        '94-2': 'r41',
        '94-15': 'r41'
    }),
    goto: map({
        '0-22': 1,
        '0-23': 2,
        '0-27': 3,
        '0-26': 4,
        '0-30': 6,
        '0-38': 8,
        '5-25': 13,
        '5-24': 14,
        '7-29': 16,
        '7-28': 17,
        '10-27': 21,
        '10-26': 4,
        '10-30': 6,
        '10-38': 8,
        '13-24': 25,
        '16-28': 27,
        '20-37': 28,
        '20-36': 29,
        '20-38': 30,
        '20-35': 32,
        '20-33': 34,
        '20-34': 35,
        '24-28': 39,
        '33-32': 45,
        '33-31': 46,
        '33-40': 47,
        '33-42': 49,
        '33-28': 51,
        '37-28': 57,
        '43-36': 59,
        '43-38': 30,
        '43-35': 32,
        '43-33': 34,
        '43-34': 35,
        '44-37': 60,
        '44-36': 29,
        '44-38': 30,
        '44-35': 32,
        '44-33': 34,
        '44-34': 35,
        '45-31': 61,
        '45-40': 47,
        '45-42': 49,
        '45-28': 51,
        '50-41': 64,
        '50-28': 65,
        '55-35': 68,
        '55-34': 69,
        '58-28': 70,
        '64-28': 74,
        '72-39': 75,
        '72-32': 76,
        '72-31': 77,
        '72-40': 78,
        '72-42': 80,
        '72-28': 82,
        '76-31': 87,
        '76-40': 78,
        '76-42': 80,
        '76-28': 82,
        '81-41': 89,
        '81-28': 65,
        '86-32': 90,
        '86-31': 77,
        '86-40': 78,
        '86-42': 80,
        '86-28': 82,
        '89-28': 74,
        '90-31': 87,
        '90-40': 78,
        '90-42': 80,
        '90-28': 82,
        '91-39': 93,
        '91-32': 76,
        '91-31': 77,
        '91-40': 78,
        '91-42': 80,
        '91-28': 82
    })
};
const reduce = (p, args, loc) => {
    if (reducers.has(p)) {
        const fn = reducers.get(p);
        return fn(args, loc, p);
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
class Locator {
    constructor(positions, prev, rule) {
        const {start, end} = this.default(positions, prev, rule);
        this.start = start;
        this.end = end;
    }
    fast(positions, last) {
        switch (positions.length) {
        case 0:
            return {
                start: last,
                end: last
            };
        case 1:
            return positions[0];
        default:
            const first = positions[0];
            const last = positions[positions.length - 1];
            return {
                start: {
                    line: first.start.line,
                    column: first.start.column
                },
                end: {
                    line: last.end.line,
                    column: last.end.column
                }
            };
        }
    }
    slow(positions, last) {
        const loc = {
            start: {
                line: Infinity,
                column: Infinity
            },
            end: {
                line: 1,
                column: 0
            }
        };
        if (nodes.length === 0) {
            loc.start = loc.end = last;
        } else {
            let count = 0;
            for (let pos of positions) {
                if (pos) {
                    if (pos.start.line <= loc.start.line) {
                        loc.start.line = pos.start.line;
                        loc.start.column = min(loc.start.column, pos.start.column);
                    }
                    if (pos.end.line >= loc.end.line) {
                        loc.end.line = pos.end.line;
                        loc.end.column = max(loc.end.column, pos.end.column);
                    }
                    count++;
                }
            }
            if (count === 0) {
                loc.start = loc.end = last;
            }
        }
        return loc;
    }
    default(...args) {
        return this.fast(...args);
    }
}
export function accepts(token) {
    return translations.has(token) && translations.get(token) < gotoStart;
}
export const defaults = {};
export class Parser {
    constructor(source = '', options = {}) {
        this.settings = Object.assign(options);
        this.source = '';
        this.states = [0];
        this.stack = [];
        this.values = [];
        this.positions = [];
        this.lastPosition = {
            row: 1,
            column: 0
        };
        for (let key in defaults) {
            if (defaults.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
                this.settings[key] = defaults[key];
            }
        }
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
    _reduce(rule) {
        const [symbol, length] = productions[rule];
        const nodes = this.values.splice(-length);
        const positions = this.positions.splice(-length);
        const lastPosition = positions.length === 0 ? null : positions[positions.length - 1];
        const loc = new Locator(positions, lastPosition, rule);
        const ast = reduce(rule, nodes, loc);
        this.states.splice(-length);
        this.states.push(lrTable.goto.get(`${ this._state() }-${ symbol }`));
        this.stack.splice(-length);
        this.stack.push(symbol);
        this.values.push(ast);
        this.positions.push(Object.assign(loc));
    }
    addSource(txt) {
        this.source += txt;
    }
    push(token) {
        if (token.type === '$')
            throw Error(`Unexpected token "$", always use "finish" to complete parsing`);
        if (!translations.has(token.type) || translations.get(token.type) >= gotoStart)
            this.showErr(new Error(`Invalid token type "${ token.type }"`));
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
                        this.values.push(token.value == null ? token.string : token.value);
                        this.positions.push(token.loc);
                        this.lastPosition = token.loc.end;
                        return;
                    }
                    if (action === 'r') {
                        this._reduce(number);
                        continue;
                    }
                } else {
                    this.showErr(token.loc, new Error(`Unexpected token "${ token.type }"`));
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
                    throw new Error(`Unexpected shift action, expected reduce oraccept`);
                if (number === 0)
                    return this.values[0];
                else {
                    this._reduce(number);
                    continue;
                }
            } else {
                throw new Error(`Unexpected end of imput`);
            }
        }
    }
}