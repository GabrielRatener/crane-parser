const {min, max} = Math;
const {freeze} = Object;
const gotoStart = 21;
const translations = map({
    'Root': 21,
    'Id': 22,
    'Grammar': 23,
    'Body': 24,
    'Specifier': 25,
    'SpecifierList': 26,
    'Import': 27,
    'BodyLine': 28,
    'String': 29,
    'StringList': 30,
    'Precedence': 31,
    'Expression': 32,
    'ExpressionList': 33,
    'AttributeList': 34,
    'Attribute': 35,
    'Production': 36,
    'DefLine': 37,
    'DefLines': 38,
    'Def': 39,
    'Args': 40,
    'CallExpression': 41,
    'OrList': 42,
    'OrExpression': 43,
    '$': 0,
    'id': 1,
    'endl': 2,
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
        23,
        1
    ],
    [
        23,
        2
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
        3
    ],
    [
        26,
        1
    ],
    [
        26,
        2
    ],
    [
        27,
        5
    ],
    [
        27,
        6
    ],
    [
        27,
        4
    ],
    [
        28,
        1
    ],
    [
        28,
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
        30,
        1
    ],
    [
        30,
        2
    ],
    [
        31,
        2
    ],
    [
        31,
        2
    ],
    [
        32,
        1
    ],
    [
        32,
        1
    ],
    [
        32,
        1
    ],
    [
        32,
        1
    ],
    [
        33,
        1
    ],
    [
        33,
        2
    ],
    [
        34,
        1
    ],
    [
        34,
        3
    ],
    [
        35,
        2
    ],
    [
        36,
        2
    ],
    [
        36,
        3
    ],
    [
        36,
        2
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
        1
    ],
    [
        37,
        3
    ],
    [
        38,
        1
    ],
    [
        38,
        3
    ],
    [
        39,
        4
    ],
    [
        40,
        1
    ],
    [
        40,
        3
    ],
    [
        41,
        5
    ],
    [
        42,
        1
    ],
    [
        42,
        2
    ],
    [
        43,
        3
    ]
];
const reducers = map({
    1: function ($, $loc, $rule) {
        return this.node.id({ name: $[0] });
    },
    4: function ($, $loc, $rule) {
        return [$[0]];
    },
    5: function ($, $loc, $rule) {
        return $[0].concat($[2]);
    },
    6: function ($, $loc, $rule) {
        return this.node.specifier({
            imported: $[0],
            local: $[0]
        });
    },
    7: function ($, $loc, $rule) {
        return this.node.specifier({
            imported: $[0],
            local: $[2]
        });
    },
    8: function ($, $loc, $rule) {
        return [$[0]];
    },
    9: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    10: function ($, $loc, $rule) {
        return this.node['import']({
            'default': $[2],
            path: $[4]
        });
    },
    11: function ($, $loc, $rule) {
        return this.node['import']({
            all: $[3],
            path: $[5]
        });
    },
    12: function ($, $loc, $rule) {
        return this.node['import']({
            dependencies: $[1],
            path: $[3]
        });
    },
    16: function ($, $loc, $rule) {
        return this.node.string({ value: $[0][0] === '\\' ? $[0].slice(1) : $[0].slice(1, -1) });
    },
    17: function ($, $loc, $rule) {
        return [$[0]];
    },
    18: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    19: function ($, $loc, $rule) {
        return this.node[$[0].slice(1)]({ tokens: $[1] });
    },
    20: function ($, $loc, $rule) {
        return this.node[$[0].slice(1)]({
            alias: $[1],
            tokens: []
        });
    },
    25: function ($, $loc, $rule) {
        return [$[0]];
    },
    26: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    27: function ($, $loc, $rule) {
        return [$[0]];
    },
    28: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[$[0]]).concat([$[$[2]]]);
    },
    29: function ($, $loc, $rule) {
        return this.node.prec({ value: $[1] });
    },
    30: function ($, $loc, $rule) {
        return this.node.production({
            production: $[1],
            code: null
        });
    },
    31: function ($, $loc, $rule) {
        return this.node.production({
            production: $[1],
            code: $[2]
        });
    },
    32: function ($, $loc, $rule) {
        return this.node.production({
            production: [],
            code: null
        });
    },
    33: function ($, $loc, $rule) {
        return this.node.production({
            production: [],
            code: $[2]
        });
    },
    36: function ($, $loc, $rule) {
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
    37: function ($, $loc, $rule) {
        return [$[0]];
    },
    38: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[2]]);
    },
    39: function ($, $loc, $rule) {
        return this.node.definition({
            name: $[0],
            body: $[2]
        });
    },
    40: function ($, $loc, $rule) {
        return [$[0]];
    },
    41: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[2]]);
    },
    42: function ($, $loc, $rule) {
        return this.node.call({
            name: $[1],
            args: $[3]
        });
    },
    43: function ($, $loc, $rule) {
        return [$[0]];
    },
    44: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    45: function ($, $loc, $rule) {
        return this.node.or({ list: $[1] });
    }
}, parseInt);
const lrTable = {
    action: map({
        '0-4': 's7',
        '0-8': 's8',
        '0-1': 's10',
        '1-0': 'r0',
        '2-0': 'r2',
        '2-2': 's11',
        '3-0': 'r4',
        '3-2': 'r4',
        '4-0': 'r13',
        '4-2': 'r13',
        '5-0': 'r14',
        '5-2': 'r14',
        '6-0': 'r15',
        '6-2': 'r15',
        '7-3': 's12',
        '7-6': 's13',
        '7-1': 's17',
        '8-7': 's20',
        '8-1': 's22',
        '9-13': 's23',
        '10-13': 'r1',
        '11-0': 'r3',
        '11-4': 's7',
        '11-8': 's8',
        '11-1': 's10',
        '12-1': 's26',
        '13-3': 's27',
        '14-5': 's28',
        '14-1': 's17',
        '15-5': 'r8',
        '15-1': 'r8',
        '16-5': 'r6',
        '16-1': 'r6',
        '16-3': 's30',
        '17-5': 'r1',
        '17-3': 'r1',
        '17-1': 'r1',
        '18-0': 'r19',
        '18-2': 'r19',
        '18-7': 's20',
        '19-0': 'r17',
        '19-2': 'r17',
        '19-7': 'r17',
        '20-0': 'r16',
        '20-2': 'r16',
        '20-7': 'r16',
        '21-0': 'r20',
        '21-2': 'r20',
        '22-0': 'r1',
        '22-2': 'r1',
        '23-10': 's38',
        '23-1': 's10',
        '23-9': 's40',
        '24-0': 'r5',
        '24-2': 'r5',
        '25-5': 's41',
        '26-5': 'r1',
        '27-1': 's26',
        '28-7': 's44',
        '29-5': 'r9',
        '29-1': 'r9',
        '30-1': 's46',
        '31-0': 'r18',
        '31-2': 'r18',
        '31-7': 'r18',
        '32-14': 's47',
        '32-2': 's48',
        '33-14': 'r37',
        '33-2': 'r37',
        '34-14': 'r34',
        '34-2': 'r34',
        '35-14': 'r35',
        '35-2': 'r35',
        '36-2': 's49',
        '37-13': 's50',
        '38-16': 's57',
        '38-19': 's58',
        '38-7': 's59',
        '38-1': 's60',
        '38-12': 's61',
        '39-2': 'r27',
        '40-1': 's63',
        '41-7': 's44',
        '42-5': 's65',
        '43-0': 'r12',
        '43-2': 'r12',
        '44-0': 'r16',
        '44-2': 'r16',
        '45-5': 'r7',
        '45-1': 'r7',
        '46-5': 'r1',
        '46-1': 'r1',
        '47-0': 'r39',
        '47-2': 'r39',
        '48-10': 's38',
        '48-1': 's10',
        '48-9': 's40',
        '49-10': 's38',
        '49-9': 's40',
        '50-10': 's38',
        '50-1': 's10',
        '50-9': 's40',
        '51-14': 'r30',
        '51-2': 'r30',
        '51-16': 's57',
        '51-19': 's58',
        '51-7': 's59',
        '51-1': 's60',
        '51-11': 's71',
        '52-14': 'r25',
        '52-2': 'r25',
        '52-16': 'r25',
        '52-19': 'r25',
        '52-7': 'r25',
        '52-1': 'r25',
        '52-11': 'r25',
        '53-14': 'r21',
        '53-2': 'r21',
        '53-16': 'r21',
        '53-19': 'r21',
        '53-7': 'r21',
        '53-1': 'r21',
        '53-11': 'r21',
        '54-14': 'r22',
        '54-2': 'r22',
        '54-16': 'r22',
        '54-19': 'r22',
        '54-7': 'r22',
        '54-1': 'r22',
        '54-11': 'r22',
        '55-14': 'r23',
        '55-2': 'r23',
        '55-16': 'r23',
        '55-19': 'r23',
        '55-7': 'r23',
        '55-1': 'r23',
        '55-11': 'r23',
        '56-14': 'r24',
        '56-2': 'r24',
        '56-16': 'r24',
        '56-19': 'r24',
        '56-7': 'r24',
        '56-1': 'r24',
        '56-11': 'r24',
        '57-1': 's73',
        '58-7': 's76',
        '59-14': 'r16',
        '59-2': 'r16',
        '59-16': 'r16',
        '59-19': 'r16',
        '59-7': 'r16',
        '59-1': 'r16',
        '59-11': 'r16',
        '60-14': 'r1',
        '60-2': 'r1',
        '60-16': 'r1',
        '60-19': 'r1',
        '60-7': 'r1',
        '60-1': 'r1',
        '60-11': 'r1',
        '61-14': 'r32',
        '61-2': 'r32',
        '61-11': 's77',
        '62-2': 'r29',
        '63-2': 'r1',
        '64-0': 'r10',
        '64-2': 'r10',
        '65-7': 's44',
        '66-14': 'r38',
        '66-2': 'r38',
        '67-14': 'r36',
        '67-2': 'r36',
        '68-2': 'r28',
        '69-14': 's79',
        '69-2': 's48',
        '70-14': 'r26',
        '70-2': 'r26',
        '70-16': 'r26',
        '70-19': 'r26',
        '70-7': 'r26',
        '70-1': 'r26',
        '70-11': 'r26',
        '71-14': 'r31',
        '71-2': 'r31',
        '72-17': 's80',
        '73-17': 'r1',
        '74-20': 's81',
        '74-7': 's76',
        '75-20': 'r43',
        '75-7': 'r43',
        '76-20': 'r16',
        '76-7': 'r16',
        '77-14': 'r33',
        '77-2': 'r33',
        '78-0': 'r11',
        '78-2': 'r11',
        '79-14': 'r39',
        '79-2': 'r39',
        '80-16': 's90',
        '80-19': 's91',
        '80-7': 's92',
        '80-1': 's93',
        '81-14': 'r45',
        '81-2': 'r45',
        '81-16': 'r45',
        '81-19': 'r45',
        '81-7': 'r45',
        '81-1': 'r45',
        '81-11': 'r45',
        '82-20': 'r44',
        '82-7': 'r44',
        '83-18': 's94',
        '83-15': 's95',
        '84-18': 'r40',
        '84-15': 'r40',
        '84-16': 's90',
        '84-19': 's91',
        '84-7': 's92',
        '84-1': 's93',
        '85-18': 'r25',
        '85-16': 'r25',
        '85-19': 'r25',
        '85-7': 'r25',
        '85-1': 'r25',
        '85-15': 'r25',
        '86-18': 'r21',
        '86-16': 'r21',
        '86-19': 'r21',
        '86-7': 'r21',
        '86-1': 'r21',
        '86-15': 'r21',
        '87-18': 'r22',
        '87-16': 'r22',
        '87-19': 'r22',
        '87-7': 'r22',
        '87-1': 'r22',
        '87-15': 'r22',
        '88-18': 'r23',
        '88-16': 'r23',
        '88-19': 'r23',
        '88-7': 'r23',
        '88-1': 'r23',
        '88-15': 'r23',
        '89-18': 'r24',
        '89-16': 'r24',
        '89-19': 'r24',
        '89-7': 'r24',
        '89-1': 'r24',
        '89-15': 'r24',
        '90-1': 's73',
        '91-7': 's76',
        '92-18': 'r16',
        '92-16': 'r16',
        '92-19': 'r16',
        '92-7': 'r16',
        '92-1': 'r16',
        '92-15': 'r16',
        '93-18': 'r1',
        '93-16': 'r1',
        '93-19': 'r1',
        '93-7': 'r1',
        '93-1': 'r1',
        '93-15': 'r1',
        '94-14': 'r42',
        '94-2': 'r42',
        '94-16': 'r42',
        '94-19': 'r42',
        '94-7': 'r42',
        '94-1': 'r42',
        '94-11': 'r42',
        '95-16': 's90',
        '95-19': 's91',
        '95-7': 's92',
        '95-1': 's93',
        '96-18': 'r26',
        '96-16': 'r26',
        '96-19': 'r26',
        '96-7': 'r26',
        '96-1': 'r26',
        '96-15': 'r26',
        '97-17': 's100',
        '98-20': 's101',
        '98-7': 's76',
        '99-18': 'r41',
        '99-15': 'r41',
        '99-16': 's90',
        '99-19': 's91',
        '99-7': 's92',
        '99-1': 's93',
        '100-16': 's90',
        '100-19': 's91',
        '100-7': 's92',
        '100-1': 's93',
        '101-18': 'r45',
        '101-16': 'r45',
        '101-19': 'r45',
        '101-7': 'r45',
        '101-1': 'r45',
        '101-15': 'r45',
        '102-18': 's103',
        '102-15': 's95',
        '103-18': 'r42',
        '103-16': 'r42',
        '103-19': 'r42',
        '103-7': 'r42',
        '103-1': 'r42',
        '103-15': 'r42'
    }),
    goto: map({
        '0-23': 1,
        '0-24': 2,
        '0-28': 3,
        '0-27': 4,
        '0-31': 5,
        '0-39': 6,
        '0-22': 9,
        '7-26': 14,
        '7-25': 15,
        '7-22': 16,
        '8-30': 18,
        '8-29': 19,
        '8-22': 21,
        '11-28': 24,
        '11-27': 4,
        '11-31': 5,
        '11-39': 6,
        '11-22': 9,
        '12-22': 25,
        '14-25': 29,
        '14-22': 16,
        '18-29': 31,
        '23-38': 32,
        '23-37': 33,
        '23-39': 34,
        '23-36': 35,
        '23-34': 36,
        '23-22': 37,
        '23-35': 39,
        '27-22': 42,
        '28-29': 43,
        '30-22': 45,
        '38-33': 51,
        '38-32': 52,
        '38-41': 53,
        '38-43': 54,
        '38-29': 55,
        '38-22': 56,
        '40-22': 62,
        '41-29': 64,
        '48-37': 66,
        '48-39': 34,
        '48-36': 35,
        '48-34': 36,
        '48-22': 37,
        '48-35': 39,
        '49-36': 67,
        '49-35': 68,
        '50-38': 69,
        '50-37': 33,
        '50-39': 34,
        '50-36': 35,
        '50-34': 36,
        '50-22': 37,
        '50-35': 39,
        '51-32': 70,
        '51-41': 53,
        '51-43': 54,
        '51-29': 55,
        '51-22': 56,
        '57-22': 72,
        '58-42': 74,
        '58-29': 75,
        '65-29': 78,
        '74-29': 82,
        '80-40': 83,
        '80-33': 84,
        '80-32': 85,
        '80-41': 86,
        '80-43': 87,
        '80-29': 88,
        '80-22': 89,
        '84-32': 96,
        '84-41': 86,
        '84-43': 87,
        '84-29': 88,
        '84-22': 89,
        '90-22': 97,
        '91-42': 98,
        '91-29': 75,
        '95-33': 99,
        '95-32': 85,
        '95-41': 86,
        '95-43': 87,
        '95-29': 88,
        '95-22': 89,
        '98-29': 82,
        '99-32': 96,
        '99-41': 86,
        '99-43': 87,
        '99-29': 88,
        '99-22': 89,
        '100-40': 102,
        '100-33': 84,
        '100-32': 85,
        '100-41': 86,
        '100-43': 87,
        '100-29': 88,
        '100-22': 89
    })
};
function map(obj, kFunc = k => k) {
    const mp = new Map();
    for (let key in obj)
        if (obj.hasOwnProperty(key))
            mp.set(kFunc(key), obj[key]);
    return mp;
}
export function untranslate(n) {
    for (const [key, value] of translations) {
        if (value === n)
            return key;
    }
}
export function accepts(token) {
    return translations.has(token) && translations.get(token) < gotoStart;
}
export const defaults = {};
class ParsingError extends Error {
    constructor(parsing, message = '') {
        super();
        const [type] = this.constructor.name.split('$');
        this.type = type;
        this.message = `${ this.type }: ${ message }`;
        this.parsing = parsing;
        this.loc = parsing.lastPosition;
    }
}
class UnexpectedTokenError extends ParsingError {
    constructor(parsing, token, message = `Unexpected "${ token.type }" token`) {
        super(parsing, message);
        this.loc = parsing._locateToken(token);
        this.token = token;
    }
}
class UnexpectedEndError extends ParsingError {
    constructor(parsing, message = 'Encountered EOF but expected more tokens') {
        super(parsing, message);
    }
}
class InvalidTokenError extends UnexpectedTokenError {
    constructor(parsing, token, message = `Invalid token type: "${ token.type }"`) {
        super(parsing, token, message);
    }
}
export class Parser {
    constructor(options = {}) {
        const {context = {}, tokenTranslator = token => token.value} = options;
        this.context = context;
        this.tokenTranslator = tokenTranslator;
        this.states = [0];
        this.stack = [];
        this.values = [];
        this.positions = [];
        this.onreducestart = null;
        this.onreduceend = null;
        this.lastPosition = {
            row: 1,
            column: 0
        };
        this.settings = { locate: false };
    }
    _state() {
        return this.states[this.states.length - 1];
    }
    _fire(eventType, data) {
        const fn = this[`on${ eventType }`];
        const internal = true;
        if (typeof fn === 'function') {
            fn.apply(this, [
                data,
                internal
            ]);
        }
    }
    _locate(positions) {
        if (positions.length === 0) {
            return freeze({
                start: this.lastPosition,
                end: this.lastPosition
            });
        } else {
            const {start} = positions[0];
            const {end} = positions[positions.length - 1];
            return freeze({
                start,
                end
            });
        }
    }
    _locateToken(token) {
        if (token.loc == null) {
            return freeze({
                start: this.lastPosition,
                end: this.lastPosition
            });
        } else {
            return token.loc;
        }
    }
    _reduce(rule) {
        ;
        const [symbol, length] = productions[rule];
        const nodes = this.values.splice(-length || this.values.length);
        const positions = this.positions.splice(-length || this.positions.length);
        const loc = this._locate(positions);
        this._fire('reducestart', {
            rule,
            nodes,
            positions,
            loc
        });
        if (reducers.has(rule)) {
            const fn = reducers.get(rule);
            this.values.push(fn.apply(this.context, [
                nodes,
                loc,
                rule
            ]));
        } else {
            this.values.push(nodes.length > 0 ? nodes[0] : []);
        }
        this._fire('reduceend', {
            loc,
            rule,
            nodes,
            positions,
            node: this.values.length > 0 ? this.values[this.values.length - 1] : null
        });
        this.states.splice(-length || this.states.length);
        this.states.push(lrTable.goto.get(`${ this._state() }-${ symbol }`));
        this.stack.splice(-length || this.stack.length);
        this.stack.push(symbol);
        this.positions.push(loc);
    }
    addSource(txt) {
        this.source += txt;
    }
    push(token, logger = null) {
        if (!translations.has(token.type) || translations.get(token.type) >= gotoStart)
            throw new InvalidTokenError(this, token);
        else {
            const type = translations.get(token.type);
            while (true) {
                const key = `${ this._state() }-${ type }`;
                if (lrTable.action.has(key)) {
                    const val = lrTable.action.get(key);
                    const action = val[0];
                    const number = parseInt(val.slice(1));
                    if (action === 's') {
                        const loc = this._locateToken(token);
                        this.states.push(number);
                        this.stack.push(type);
                        this.values.push(this.tokenTranslator(token));
                        this.positions.push(loc);
                        this.lastPosition = loc.end;
                        return;
                    }
                    if (action === 'r') {
                        this._reduce(number);
                        continue;
                    }
                } else {
                    throw new UnexpectedTokenError(this, token);
                }
            }
        }
    }
    finish(logger = null) {
        const type = translations.get('$');
        while (true) {
            const key = `${ this._state() }-${ type }`;
            if (lrTable.action.has(key)) {
                const val = lrTable.action.get(key);
                const action = val[0];
                const number = parseInt(val.slice(1));
                if (action !== 'r')
                    throw new UnexpectedEndError(this);
                if (number === 0)
                    return this.values[0];
                else {
                    this._reduce(number);
                    continue;
                }
            } else {
                throw new UnexpectedEndError(this);
            }
        }
    }
}