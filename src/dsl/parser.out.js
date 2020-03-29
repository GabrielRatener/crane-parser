// Parser generated from LR Grammar
const {min, max} = Math;
const {freeze} = Object;
const gotoStart = 22;
const translations = map({
    'Root': 22,
    'Id': 23,
    'Address': 24,
    'Grammar': 25,
    'Body': 26,
    'Specifier': 27,
    'SpecifierList': 28,
    'Import': 29,
    'BodyLine': 30,
    'String': 31,
    'StringList': 32,
    'Precedence': 33,
    'Expression': 34,
    'ExpressionList': 35,
    'AttributeList': 36,
    'Attribute': 37,
    'Production': 38,
    'DefLine': 39,
    'DefLines': 40,
    'Def': 41,
    'Args': 42,
    'CallExpression': 43,
    'OrList': 44,
    'OrExpression': 45,
    '$': 0,
    'id': 1,
    '.': 2,
    'endl': 3,
    ':': 4,
    'import': 5,
    'from': 6,
    '*': 7,
    'string': 8,
    'ass': 9,
    'prec': 10,
    '>': 11,
    'code': 12,
    'eps': 13,
    'indent': 14,
    'dedent': 15,
    ',': 16,
    '@': 17,
    '(': 18,
    ')': 19,
    '[': 20,
    ']': 21
});
const productions = [
    [
        22,
        1
    ],
    [
        23,
        1
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
        1
    ],
    [
        26,
        3
    ],
    [
        27,
        1
    ],
    [
        27,
        3
    ],
    [
        28,
        1
    ],
    [
        28,
        2
    ],
    [
        29,
        5
    ],
    [
        29,
        6
    ],
    [
        29,
        4
    ],
    [
        30,
        1
    ],
    [
        30,
        1
    ],
    [
        30,
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
        2
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
        1
    ],
    [
        34,
        1
    ],
    [
        34,
        1
    ],
    [
        35,
        1
    ],
    [
        35,
        2
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
        2
    ],
    [
        38,
        2
    ],
    [
        38,
        3
    ],
    [
        38,
        2
    ],
    [
        38,
        3
    ],
    [
        39,
        1
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
        1
    ],
    [
        40,
        3
    ],
    [
        41,
        4
    ],
    [
        42,
        1
    ],
    [
        42,
        3
    ],
    [
        43,
        5
    ],
    [
        44,
        1
    ],
    [
        44,
        2
    ],
    [
        45,
        3
    ]
];
const reducers = map({
    1: function ($, $loc, $rule) {
        return this.node.id({ name: $[0] });
    },
    2: function ($, $loc, $rule) {
        return this.node.address({ path: [$[0].name] });
    },
    3: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return this.node.address({ path: slice$.call($[0].path).concat([$[2].name]) });
    },
    6: function ($, $loc, $rule) {
        return [$[0]];
    },
    7: function ($, $loc, $rule) {
        return $[0].concat($[2]);
    },
    8: function ($, $loc, $rule) {
        return this.node.specifier({
            imported: $[0],
            local: $[0]
        });
    },
    9: function ($, $loc, $rule) {
        return this.node.specifier({
            imported: $[0],
            local: $[2]
        });
    },
    10: function ($, $loc, $rule) {
        return [$[0]];
    },
    11: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    12: function ($, $loc, $rule) {
        return this.node['import']({
            'default': $[2],
            path: $[4]
        });
    },
    13: function ($, $loc, $rule) {
        return this.node['import']({
            all: $[3],
            path: $[5]
        });
    },
    14: function ($, $loc, $rule) {
        return this.node['import']({
            dependencies: $[1],
            path: $[3]
        });
    },
    18: function ($, $loc, $rule) {
        return this.node.string({ value: $[0][0] === '\\' ? $[0].slice(1) : $[0].slice(1, -1) });
    },
    19: function ($, $loc, $rule) {
        return [$[0]];
    },
    20: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    21: function ($, $loc, $rule) {
        return this.node[$[0].slice(1)]({ tokens: $[1] });
    },
    22: function ($, $loc, $rule) {
        return this.node[$[0].slice(1)]({
            alias: $[1],
            tokens: []
        });
    },
    27: function ($, $loc, $rule) {
        return [$[0]];
    },
    28: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    29: function ($, $loc, $rule) {
        return [$[0]];
    },
    30: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[$[0]]).concat([$[$[2]]]);
    },
    31: function ($, $loc, $rule) {
        return this.node.prec({ value: $[1] });
    },
    32: function ($, $loc, $rule) {
        return this.node.production({
            production: $[1],
            code: null
        });
    },
    33: function ($, $loc, $rule) {
        return this.node.production({
            production: $[1],
            code: $[2]
        });
    },
    34: function ($, $loc, $rule) {
        return this.node.production({
            production: [],
            code: null
        });
    },
    35: function ($, $loc, $rule) {
        return this.node.production({
            production: [],
            code: $[2]
        });
    },
    38: function ($, $loc, $rule) {
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
    39: function ($, $loc, $rule) {
        return [$[0]];
    },
    40: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[2]]);
    },
    41: function ($, $loc, $rule) {
        return this.node.definition({
            name: $[0],
            body: $[2]
        });
    },
    42: function ($, $loc, $rule) {
        return [$[0]];
    },
    43: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[2]]);
    },
    44: function ($, $loc, $rule) {
        return this.node.call({
            name: $[1],
            args: $[3]
        });
    },
    45: function ($, $loc, $rule) {
        return [$[0]];
    },
    46: function ($, $loc, $rule) {
        var slice$ = [].slice;
        return slice$.call($[0]).concat([$[1]]);
    },
    47: function ($, $loc, $rule) {
        return this.node.or({ list: $[1] });
    }
}, parseInt);
const lrTable = {
    action: map({
        '0-5': 's7',
        '0-9': 's8',
        '0-1': 's10',
        '1-0': 'r0',
        '2-0': 'r4',
        '2-3': 's11',
        '3-0': 'r6',
        '3-3': 'r6',
        '4-0': 'r15',
        '4-3': 'r15',
        '5-0': 'r16',
        '5-3': 'r16',
        '6-0': 'r17',
        '6-3': 'r17',
        '7-4': 's12',
        '7-7': 's13',
        '7-1': 's17',
        '8-8': 's20',
        '8-1': 's22',
        '9-14': 's23',
        '10-14': 'r1',
        '11-0': 'r5',
        '11-5': 's7',
        '11-9': 's8',
        '11-1': 's10',
        '12-1': 's26',
        '13-4': 's27',
        '14-6': 's28',
        '14-1': 's17',
        '15-6': 'r10',
        '15-1': 'r10',
        '16-6': 'r8',
        '16-1': 'r8',
        '16-4': 's30',
        '17-6': 'r1',
        '17-4': 'r1',
        '17-1': 'r1',
        '18-0': 'r21',
        '18-3': 'r21',
        '18-8': 's20',
        '19-0': 'r19',
        '19-3': 'r19',
        '19-8': 'r19',
        '20-0': 'r18',
        '20-3': 'r18',
        '20-8': 'r18',
        '21-0': 'r22',
        '21-3': 'r22',
        '22-0': 'r1',
        '22-3': 'r1',
        '23-11': 's38',
        '23-1': 's10',
        '23-10': 's40',
        '24-0': 'r7',
        '24-3': 'r7',
        '25-6': 's41',
        '26-6': 'r1',
        '27-1': 's26',
        '28-8': 's44',
        '29-6': 'r11',
        '29-1': 'r11',
        '30-1': 's46',
        '31-0': 'r20',
        '31-3': 'r20',
        '31-8': 'r20',
        '32-15': 's47',
        '32-3': 's48',
        '33-15': 'r39',
        '33-3': 'r39',
        '34-15': 'r36',
        '34-3': 'r36',
        '35-15': 'r37',
        '35-3': 'r37',
        '36-3': 's49',
        '37-14': 's50',
        '38-17': 's57',
        '38-20': 's58',
        '38-8': 's59',
        '38-1': 's61',
        '38-13': 's62',
        '39-3': 'r29',
        '40-1': 's64',
        '41-8': 's44',
        '42-6': 's66',
        '43-0': 'r14',
        '43-3': 'r14',
        '44-0': 'r18',
        '44-3': 'r18',
        '45-6': 'r9',
        '45-1': 'r9',
        '46-6': 'r1',
        '46-1': 'r1',
        '47-0': 'r41',
        '47-3': 'r41',
        '48-11': 's38',
        '48-1': 's10',
        '48-10': 's40',
        '49-11': 's38',
        '49-10': 's40',
        '50-11': 's38',
        '50-1': 's10',
        '50-10': 's40',
        '51-15': 'r32',
        '51-3': 'r32',
        '51-17': 's57',
        '51-20': 's58',
        '51-8': 's59',
        '51-1': 's61',
        '51-12': 's72',
        '52-15': 'r27',
        '52-3': 'r27',
        '52-17': 'r27',
        '52-20': 'r27',
        '52-8': 'r27',
        '52-1': 'r27',
        '52-12': 'r27',
        '53-15': 'r23',
        '53-3': 'r23',
        '53-17': 'r23',
        '53-20': 'r23',
        '53-8': 'r23',
        '53-1': 'r23',
        '53-12': 'r23',
        '54-15': 'r24',
        '54-3': 'r24',
        '54-17': 'r24',
        '54-20': 'r24',
        '54-8': 'r24',
        '54-1': 'r24',
        '54-12': 'r24',
        '55-15': 'r25',
        '55-3': 'r25',
        '55-17': 'r25',
        '55-20': 'r25',
        '55-8': 'r25',
        '55-1': 'r25',
        '55-12': 'r25',
        '56-15': 'r26',
        '56-3': 'r26',
        '56-17': 'r26',
        '56-20': 'r26',
        '56-8': 'r26',
        '56-1': 'r26',
        '56-12': 'r26',
        '56-2': 's73',
        '57-1': 's75',
        '58-8': 's78',
        '59-15': 'r18',
        '59-3': 'r18',
        '59-17': 'r18',
        '59-20': 'r18',
        '59-8': 'r18',
        '59-1': 'r18',
        '59-12': 'r18',
        '60-15': 'r2',
        '60-3': 'r2',
        '60-2': 'r2',
        '60-17': 'r2',
        '60-20': 'r2',
        '60-8': 'r2',
        '60-1': 'r2',
        '60-12': 'r2',
        '61-15': 'r1',
        '61-3': 'r1',
        '61-2': 'r1',
        '61-17': 'r1',
        '61-20': 'r1',
        '61-8': 'r1',
        '61-1': 'r1',
        '61-12': 'r1',
        '62-15': 'r34',
        '62-3': 'r34',
        '62-12': 's79',
        '63-3': 'r31',
        '64-3': 'r1',
        '65-0': 'r12',
        '65-3': 'r12',
        '66-8': 's44',
        '67-15': 'r40',
        '67-3': 'r40',
        '68-15': 'r38',
        '68-3': 'r38',
        '69-3': 'r30',
        '70-15': 's81',
        '70-3': 's48',
        '71-15': 'r28',
        '71-3': 'r28',
        '71-17': 'r28',
        '71-20': 'r28',
        '71-8': 'r28',
        '71-1': 'r28',
        '71-12': 'r28',
        '72-15': 'r33',
        '72-3': 'r33',
        '73-1': 's61',
        '74-18': 's83',
        '75-18': 'r1',
        '76-21': 's84',
        '76-8': 's78',
        '77-21': 'r45',
        '77-8': 'r45',
        '78-21': 'r18',
        '78-8': 'r18',
        '79-15': 'r35',
        '79-3': 'r35',
        '80-0': 'r13',
        '80-3': 'r13',
        '81-15': 'r41',
        '81-3': 'r41',
        '82-15': 'r3',
        '82-3': 'r3',
        '82-2': 'r3',
        '82-17': 'r3',
        '82-20': 'r3',
        '82-8': 'r3',
        '82-1': 'r3',
        '82-12': 'r3',
        '83-17': 's93',
        '83-20': 's94',
        '83-8': 's95',
        '83-1': 's97',
        '84-15': 'r47',
        '84-3': 'r47',
        '84-17': 'r47',
        '84-20': 'r47',
        '84-8': 'r47',
        '84-1': 'r47',
        '84-12': 'r47',
        '85-21': 'r46',
        '85-8': 'r46',
        '86-19': 's98',
        '86-16': 's99',
        '87-19': 'r42',
        '87-16': 'r42',
        '87-17': 's93',
        '87-20': 's94',
        '87-8': 's95',
        '87-1': 's97',
        '88-19': 'r27',
        '88-17': 'r27',
        '88-20': 'r27',
        '88-8': 'r27',
        '88-1': 'r27',
        '88-16': 'r27',
        '89-19': 'r23',
        '89-17': 'r23',
        '89-20': 'r23',
        '89-8': 'r23',
        '89-1': 'r23',
        '89-16': 'r23',
        '90-19': 'r24',
        '90-17': 'r24',
        '90-20': 'r24',
        '90-8': 'r24',
        '90-1': 'r24',
        '90-16': 'r24',
        '91-19': 'r25',
        '91-17': 'r25',
        '91-20': 'r25',
        '91-8': 'r25',
        '91-1': 'r25',
        '91-16': 'r25',
        '92-19': 'r26',
        '92-17': 'r26',
        '92-20': 'r26',
        '92-8': 'r26',
        '92-1': 'r26',
        '92-16': 'r26',
        '92-2': 's101',
        '93-1': 's75',
        '94-8': 's78',
        '95-19': 'r18',
        '95-17': 'r18',
        '95-20': 'r18',
        '95-8': 'r18',
        '95-1': 'r18',
        '95-16': 'r18',
        '96-19': 'r2',
        '96-2': 'r2',
        '96-17': 'r2',
        '96-20': 'r2',
        '96-8': 'r2',
        '96-1': 'r2',
        '96-16': 'r2',
        '97-19': 'r1',
        '97-2': 'r1',
        '97-17': 'r1',
        '97-20': 'r1',
        '97-8': 'r1',
        '97-1': 'r1',
        '97-16': 'r1',
        '98-15': 'r44',
        '98-3': 'r44',
        '98-17': 'r44',
        '98-20': 'r44',
        '98-8': 'r44',
        '98-1': 'r44',
        '98-12': 'r44',
        '99-17': 's93',
        '99-20': 's94',
        '99-8': 's95',
        '99-1': 's97',
        '100-19': 'r28',
        '100-17': 'r28',
        '100-20': 'r28',
        '100-8': 'r28',
        '100-1': 'r28',
        '100-16': 'r28',
        '101-1': 's97',
        '102-18': 's106',
        '103-21': 's107',
        '103-8': 's78',
        '104-19': 'r43',
        '104-16': 'r43',
        '104-17': 's93',
        '104-20': 's94',
        '104-8': 's95',
        '104-1': 's97',
        '105-19': 'r3',
        '105-2': 'r3',
        '105-17': 'r3',
        '105-20': 'r3',
        '105-8': 'r3',
        '105-1': 'r3',
        '105-16': 'r3',
        '106-17': 's93',
        '106-20': 's94',
        '106-8': 's95',
        '106-1': 's97',
        '107-19': 'r47',
        '107-17': 'r47',
        '107-20': 'r47',
        '107-8': 'r47',
        '107-1': 'r47',
        '107-16': 'r47',
        '108-19': 's109',
        '108-16': 's99',
        '109-19': 'r44',
        '109-17': 'r44',
        '109-20': 'r44',
        '109-8': 'r44',
        '109-1': 'r44',
        '109-16': 'r44'
    }),
    goto: map({
        '0-25': 1,
        '0-26': 2,
        '0-30': 3,
        '0-29': 4,
        '0-33': 5,
        '0-41': 6,
        '0-23': 9,
        '7-28': 14,
        '7-27': 15,
        '7-23': 16,
        '8-32': 18,
        '8-31': 19,
        '8-23': 21,
        '11-30': 24,
        '11-29': 4,
        '11-33': 5,
        '11-41': 6,
        '11-23': 9,
        '12-23': 25,
        '14-27': 29,
        '14-23': 16,
        '18-31': 31,
        '23-40': 32,
        '23-39': 33,
        '23-41': 34,
        '23-38': 35,
        '23-36': 36,
        '23-23': 37,
        '23-37': 39,
        '27-23': 42,
        '28-31': 43,
        '30-23': 45,
        '38-35': 51,
        '38-34': 52,
        '38-43': 53,
        '38-45': 54,
        '38-31': 55,
        '38-24': 56,
        '38-23': 60,
        '40-23': 63,
        '41-31': 65,
        '48-39': 67,
        '48-41': 34,
        '48-38': 35,
        '48-36': 36,
        '48-23': 37,
        '48-37': 39,
        '49-38': 68,
        '49-37': 69,
        '50-40': 70,
        '50-39': 33,
        '50-41': 34,
        '50-38': 35,
        '50-36': 36,
        '50-23': 37,
        '50-37': 39,
        '51-34': 71,
        '51-43': 53,
        '51-45': 54,
        '51-31': 55,
        '51-24': 56,
        '51-23': 60,
        '57-23': 74,
        '58-44': 76,
        '58-31': 77,
        '66-31': 80,
        '73-23': 82,
        '76-31': 85,
        '83-42': 86,
        '83-35': 87,
        '83-34': 88,
        '83-43': 89,
        '83-45': 90,
        '83-31': 91,
        '83-24': 92,
        '83-23': 96,
        '87-34': 100,
        '87-43': 89,
        '87-45': 90,
        '87-31': 91,
        '87-24': 92,
        '87-23': 96,
        '93-23': 102,
        '94-44': 103,
        '94-31': 77,
        '99-35': 104,
        '99-34': 88,
        '99-43': 89,
        '99-45': 90,
        '99-31': 91,
        '99-24': 92,
        '99-23': 96,
        '101-23': 105,
        '103-31': 85,
        '104-34': 100,
        '104-43': 89,
        '104-45': 90,
        '104-31': 91,
        '104-24': 92,
        '104-23': 96,
        '106-42': 108,
        '106-35': 87,
        '106-34': 88,
        '106-43': 89,
        '106-45': 90,
        '106-31': 91,
        '106-24': 92,
        '106-23': 96
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
