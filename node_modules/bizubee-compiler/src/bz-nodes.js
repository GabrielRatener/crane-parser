
import * as js from './js-nodes';
import escodegen from './dep/escodegen';
import {Lines, Line} from './errors';
import {Queue} from './collectibles';
import vargen from './vargen';
import {
    getJSAssign,
    getJSDeclare,
    getJSIterable,
    getJSMethodCall,
    getJSMemberExpression
    } from './js-gen';
import {parseRawTokens} from './parser';

const _ = null;

const PKEY = Symbol('Program key');
const OKEY = Symbol('Options key');

const IGNORE = Symbol('Ingorable properties');

const EMPTY = new js.EmptyStatement();
const LIB_PATH = "bizubee lib";

const binaryOperator = new Set([
    "==",
    "!=",
    "<",
    "<=",
    ">",
    ">=",
    "+",
    "-",
    "*",
    "/",
    "//",
    "%",
    "^",
    "&",
    "has",
    "is"
]);

const logicalOperator = new Set([
    "or",
    "and"
]);

const assignmentOperator = new Set([
    "=",
    "+=",
    "-=",
    "*=",
    "/=",
    "//=",
    "%=",
    "^=",
    "&="
]);

const updateOperator = new Set([
    "++",
    "--"
]);

const unaryOperators = new Set([
    '+',
    '-',
    'delete',
    '!'
]);

const convert = {
    // cuz JS's '==' operator is total sh**
    '==': '===',
    '!=': '!==',

    'OR': '||',
    'AND': '&&',
    'IS': 'instanceof',

    '&': '+'
};

const stringEscapeTable = {
    'n': '\n',
    'r': '\r',
    't': '\t',
    'b': '\b',
    'f': '\f'
};

const PATH_MAP = new Map();
const PARENT_KEY = Symbol('parent');
const POSITION_KEY = Symbol('position');

const vars = new Set();
const nodeQueue = new Queue();


// string to js Identifier node
function strtoid(name) {
    return new js.Identifier(name);
}

function defined(val) {
    return val !== undefined && val !== null;
}

function assertBinaryOperator(operator) {
    if (binaryOperator.has(operator)) {
        return operator;
    } else {
        throw new Error(`Operator "${operator}" not binary!`);
    }
}

function assertLogicalOperator(operator) {
    if (logicalOperator.has(operator)) {
        return operator;
    } else {
        throw new Error(`Operator "${operator}" not logical!`);
    }
}

function assertAssignmentOperator(operator) {
    if (assignmentOperator.has(operator)) {
        return operator;
    } else {
        throw new Error(`Operator "${operator}" not assignment!`);
    }
}

function assertUpdateOperator(operator) {
    if (updateOperator.has(operator)) {
        return operator;
    } else {
        throw new Error(`Operator "${operator}" not update!`);
    }
}


function statement(jsExpr) {
    if (jsExpr instanceof Array) {
        let arr = [];
        for (let i = 0; i < jsExpr.length; i++) {
            arr.push(statement(jsExpr[i]));
        }

        return arr;
    }

    if (jsExpr instanceof js.Expression) {
        return new js.ExpressionStatement(jsExpr);
    } else {
        return jsExpr;
    }
}


function iife(statements) {
    return new js.CallExpression(
        new js.FunctionExpression(
            null,
            [],
            new js.BlockStatement(statements)
            ),
        []
        );
}

export function wrap(node) {
    if (node instanceof BlockStatement) {
        return node;
    } else {
        return new BlockStatement([node]).pos(node[POSITION_KEY]);
    }
}


export class Node {
    constructor() {
        this[IGNORE] = new Set();
        this.type = this.constructor.name;
        this.loc = null;

        this.meta = {
            compiled: false
        };
    }

    getOpvars(n) {
        return this
        .getParentScope()
        .getOpvars(n);
    }

    freeOpvars(opvars) {
        return this
        .getParentScope()
        .freeOpvars(opvars);
    }

    onBuild() {
        for (var key in this) {
            const nd = this[key];
            if (nd instanceof Node) {
                nd[PARENT_KEY] = this;
                nd.onBuild();
                continue;
            }

            if (nd instanceof Array) {
                for (let node of nd) {
                    if (node instanceof Node) {
                        node[PARENT_KEY] = this;
                        node.onBuild();
                    }
                }
                continue;
            }
        }
    }

    * walk() {
        var ignore = this[IGNORE];
        outer:
        for (let key in this) {
            if (ignore.has(key))
                continue;

            let obj = this[key];
            if (obj instanceof Array) {
                for (let val of obj) {
                    if (!(val instanceof Node))
                        continue outer;

                    let nosearch = yield {key, value: val};
                    if (nosearch)
                        continue;

                    yield* val.walk();
                }
            } else if (obj instanceof Node) {
                let nosearch = yield {key, value: obj};
                if (nosearch)
                    continue;
                yield* obj.walk();
            }
        }
    }

    pos(left, right = null) {
        if (right === null) {
            this[POSITION_KEY] = left;
        } else {
            this[POSITION_KEY] = {
                first_column: left.first_column,
                first_line: left.first_line,
                last_column: right.last_column,
                last_line: right.last_line
            }
        }
        return this;
    }

    toJS(o) {
        if (this.meta.compiled) {
            this.error(`Cannot recompile ${this.constructor.name} node!`);
            throw new Error('Cannot compile node more than once!');
        } else {
            this.meta.compiled = true;
            return this._toJS(o);
        }
    }

    // make sure this method is implemented for all node subclasses
    _toJS(o) {
        this.error('Method "toJS" not implemented!');
    }

    getParentScope() {
        let parent = this.parent;
        while (true) {
            if (parent instanceof Scope) {
                return parent;
            } else {
                parent = parent.parent;
            }
        }
    }

    getParentBlock() {
        let block = this.getParentScope();
        if (block instanceof Program) {
            return null;
        } else {
            return block;
        }
    }

    getParentFunction() {
        let parent = this.parent;
        while (true) {
            if (parent instanceof FunctionExpression) {
                return parent;
            } else if (parent instanceof Program) {
                return null;
            } else {
                parent = parent.parent;
            }
        }
    }

    error(text) {
        let loc = this[POSITION_KEY];
        let x = loc.first_column, y = loc.first_line;
        let lines = new Lines(this.source, 4);
        if (!!this.program.parameters.throwSyntax) {
            throw new Error('Parser error!');
        } else {
            lines.error(text, [x, y]);
        }
    }

    get parent() {
        return this[PARENT_KEY];
    }

    get program() {
        if (this[PKEY] !== undefined) return this[PKEY];

        let current = this;
        while (true) {
            if (current instanceof Program) {
                this[PKEY] = current;
                return current;
            }

            if (current.type === "ExpressionStatement") {
                if (current.parent === null) {
                    console.log(JSON.stringify(current, null, 4));
                }
            }
            current = current.parent;
        }
    }


    set source(value) {
        this.program.parameters.source = value;
    }

    get source() {
        return this.program.parameters.source;
    }

    get position() {
        let position = this[POSITION_KEY];
        return [
            position.first_column,
            position.first_line,
            position.last_column,
            position.last_line,
        ];
    }
}

// includes block scopes and the program/module scope
export class Scope extends Node {
    constructor(statements) {
        super();
        this.body = statements;
        this.meta.opVars = [];
        this.meta.forbiddenVars = new Set();
        this.meta.functionDeclarations = new Map();
    }

    getJSStatements(o) {
        const jsStatements = [];

        for (var statement of this.body) {
            jsStatements.push(...statement.toJS(o));
        }

        return [
            ...this.getFunctionDeclarations(),
            ...this.getOpvarsDeclaration(),
            ...jsStatements
        ];
    }

    getOpvars(n) {
        let arr = [], i = 0;

        while (arr.length < n) {
            if (i < this.meta.opVars.length) {
                let opvar = this.meta.opVars[i];
                if (!this.meta.forbiddenVars.has(opvar)) {
                    arr.push(opvar);
                    this.meta.forbiddenVars.add(opvar);
                }
            } else {
                let opvar = this.program.vargen('opvar');
                this.meta.opVars.push(opvar);
                arr.push(opvar);
                this.meta.forbiddenVars.add(opvar);
            }
            i++;
        }

        return arr;
    }

    freeOpvars(opvars) {
        for (var opvar of opvars) {
            this.meta.forbiddenVars.delete(opvar);
        }
    }

    getOpvarsDeclaration() {
        let identifiers =
            this.meta.opVars
                .map(id => new js.Identifier(id));
        if (identifiers.length === 0) {
            return [];
        } else {
            return new js.VariableDeclaration(identifiers, 'let');
        }
    }

    getFunctionDeclarations() {
        const declarators = [];
        for (var [name, func] of this.meta.functionDeclarations) {
            const declarator = new js.VariableDeclarator(
                new js.Identifier(name),
                func
                );
            declarators.push(declarator);
        }
        if (declarators.length === 0) {
            return [];
        } else {
            return new js.VariableDeclaration(declarators, 'const');
        }
    }
}

export class Program extends Scope {
    constructor(statements) {
        super(statements);

        this.onBuild();
        this.meta.containsMain = false;
        this.meta.utilities = new Map();
    }

    util(name) {
        if (this.meta.utilities.has(name)) {
            return this.meta.utilities.get(name);
        } else {
            let utilVar = this.vargen('_' + name, false);
            this.meta.utilities.set(name, utilVar);
            return utilVar;
        }
    }

    forbid(name) {
        this.meta.forbiddenVars.add(name);
    }

    vargen(name, forbid = true) {
        return vargen(this.meta.forbiddenVars, name, forbid);
    }

    set parameters(params) {
        this[OKEY] = params;
    }

    get parameters() {
        return this[OKEY];
    }

    _toJS(o) {
        let body = this.getJSStatements({}); // must come first
        let imports = [];
        let path = new js.Literal('' + LIB_PATH);


        for (let [remote, local] of this.meta.utilities) {
            imports.push(
                new js.ImportSpecifier(
                    new js.Identifier(local),
                    new js.Identifier(remote)
                )
            );
        }
        return new js.Program(
            [
                ...(imports.length?
                    new js.ImportDeclaration(imports, path) :
                    []),
                ...body
            ]
        ).from(this);
    }
}

export class Statement extends Node {

}

export class BlockStatement extends Scope {
    _toJS(o) {
        return new js.BlockStatement(
            this.getJSStatements({})
        ).from(this);
    }
}

export class ExpressionStatement extends Statement {
    constructor(expression) {
        super();

        this.expression = expression;
    }

    _toJS(o) {
        return new js.ExpressionStatement(this.expression.toJS(o))
            .from(this);
    }
}

// *
export class IfStatement extends Statement {
    constructor(test, consequent, alternate = null) {
        super();

        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }

    _toJS(o) {
        let test        = this.test.toJS(o);
        let consequent  = this.consequent.toJS(o);
        let alternate   = null;

        if (this.alternate !== null)
            alternate = this.alternate.toJS(o);

        return new js.IfStatement(test, consequent, alternate)
            .from(this);
    }

    setAlternate(alternate) {
        this.alternate = alternate;
        return this;
    }
}

export class ControllStatement extends Statement {
    _label() {
        const target = this._target();
        if (target.label === null) {
            const label = this.program.vargen('label');
            target.label = label;
            return label;
        } else {
            return target.label;
        }
    }

    _target() {
        var current = this.parent, n = this.magnitude;

        while (true) {
            if (
                current instanceof ForStatement ||
                current instanceof WhileStatement
                ) {

                if (n === 0) {
                    return current;
                } else {
                    n--;
                }
            } else if (current instanceof FunctionExpression) {
                this.error('Cannot break/continue outside of function!');
            } else if (current instanceof Program) {
                this.error('Not enough nested loops to break/continue from!');
            }

            current = current.parent;
        }
    }
}

// *
export class BreakStatement extends ControllStatement {
    constructor(magnitude = 0) {
        super();
                this.magnitude = +magnitude;
    }

    _toJS(o) {
        if (this.magnitude === 0) {
            return new js.BreakStatement()
                .from(this);
        } else {
            const label = this._label();
            return new js.BreakStatement(
                new js.Identifier(label)
                ).from(this);
        }
    }
}

// *
export class ContinueStatement extends ControllStatement {
    constructor(magnitude = 0) {
        super();
                this.magnitude = +magnitude;
    }

    _toJS(o) {
        if (this.magnitude === 0) {
            return new js.ContinueStatement()
                .from(this);
        } else {
            const label = this._label();
            return new js.ContinueStatement(
                new js.Identifier(label)
                ).from(this);
        }
    }
}

// *
export class SwitchStatement extends Statement {
    constructor(discriminant, cases) {
        super();

        this.discriminant = discriminant;
        this.cases = cases;
    }
}

// *
export class ReturnStatement extends Statement {
    constructor(argument, after) {
        super();

        this.argument = argument;
        this.after = after;
    }

    _toJS(o) {
        if (defined(this.after)) {
            if (this.after instanceof ReturnStatement)
                this.after.error('Cannot return from function multiple times!');

            let variableName    = this.program.vargen('out');
            let variable        = new js.Identifier(variableName);
            let lines           = [
                getJSDeclare(variable, this.argument.toJS(o), 'const')
            ];

            lines.push(...this.after.toJS(o));
            lines.push(new js.ReturnStatement(variable).from(this));
            return statement(lines);
        } else {
            if (defined(this.argument))
                return new js.ReturnStatement(this.argument.toJS(o))
                    .from(this);
            else
                return new js.ReturnStatement()
                    .from(this);
        }
    }
}


export class ThrowStatement extends Statement {
    constructor(argument) {
        super();

        this.argument = argument;
    }

    _toJS(o) {
        return new js.ThrowStatement(this.argument.toJS(o))
            .from(this);
    }
}

export class TryStatement extends Statement {
    constructor(block, catchClause = null, finalizer = null) {
        super();

        this.block = block;
        this.handler = catchClause;
        this.finalizer = finalizer;
    }

    _toJS(o) {
        let handler = (defined(this.handler)) ? this.handler.toJS(o) : null;
        let finalizer = (defined(this.finalizer)) ? this.finalizer.toJS(o) : null;
        return new js.TryStatement(
            this.block.toJS(o),
            handler,
            finalizer
            ).from(this);
    }
}


export class WhileStatement extends Statement {
    constructor(test, body) {
        super();

        this.test = test;
        this.body = body;
        this.label = null;
    }

    _toJS(o) {
        let test = this.test.toJS(o);
        let body = this.body.toJS(o);

        if (this.label === null) {
            return new js.WhileStatement(test, body)
                .from(this);
        } else {
            return new js.LabeledStatement(
                new js.Identifier(this.label),
                new js.WhileStatement(test, body)
                ).from(this);
        }
    }
}

export class ForStatement extends Statement {
    constructor(left, right, body, async = false) {
        super();

        this.left = left;
        this.right = right;
        this.body = body;
        this.async = async;
        this.label = null;
    }

    _toJS(o) {
        if (this.async) return this.asyncToJS(o);
        else return this.syncToJS(o);
    }

    syncToJS(o) {
        let declaration = new js.VariableDeclaration(
            [new js.VariableDeclarator(this.left.toJS(o))],
            'let'
            );

        let loop = new js.ForOfStatement(
            this.body.toJS(o),
            declaration,
            this.right.toJS(o)
            );

        if (this.label === null) {
            return loop.from(this);
        } else {
            return new js.LabeledStatement(
                new js.Identifier(this.label),
                loop
                ).from(this);
        }
    }

    asyncToJS(o) {
        let pfunc = this.getParentFunction();
        if (!pfunc.async)
            this.error('Cannot have for-on loop in sync function!');

        let right = this.program.vargen('agen');   // variable placeholder for async generator expression
        let ctrl = this.program.vargen('stat');    // generator's {done(bool), value} variable

        // async gen expression, e.g.: asyncIterable[lib.symbols.observer]()
        let symbolVar = this.program.util('symbols');
        let asyncGen = new js.CallExpression(
            new js.MemberExpression(
                this.right.toJS(),
                getJSMemberExpression([symbolVar, 'observer']),
                true
                ),
            []
            );


        // initialize vars holding async iterator and
        // async iterator controller ({done : true|false, value: ...})
        let init = new js.VariableDeclaration(
            [
                new js.VariableDeclarator(strtoid(ctrl)),
                new js.VariableDeclarator(strtoid(right), asyncGen),
            ],
            'let'
            );

        // update iterator controller
        let update = new js.AssignmentExpression(
            '=',
            strtoid(ctrl),
            new js.YieldExpression(getJSMethodCall([right, 'next'], []))
            );

        // if !<ctrl var>.done keep iterating
        let test = new js.UnaryExpression(
            '!',
            getJSMemberExpression([ctrl, 'done'])
            );


        // this is where the loop variable is assigned
        let declare = new js.VariableDeclaration([
            new js.VariableDeclarator(
                this.left.toJS(o),
                getJSMemberExpression([ctrl, 'value'])
                )
            ],
            'let'
            );

        let body = [declare];
        for (let line of this.body) {
            body.push(line.toJS(o));
        }


        var loop = new js.ForStatement(
            new js.BlockStatement(body),
            init,
            new js.SequenceExpression([
                update,
                test
            ])
            );

        if (this.label === null) {
            return loop.from(this);
        } else {
            return new js.LabeledStatement(
                new js.Identifier(this.label),
                loop
                ).from(this);
        }
    }
}

export class Declaration extends Statement {

}

export class VariableDeclaration extends Declaration {
    constructor(declarators, constant = false) {
        super();

        this.declarators = declarators;
        this.constant = constant;
    }

    * varnames() {
        for (var id of this.extractVariables()) {
            yield id.name;
        }
    }

    * extractVariables() {
        for (let decl of this.declarators) {
            let left = decl.id;

            if (left instanceof Identifier) {
                yield left.name;
                continue;
            }

            if (left instanceof Pattern) {
                yield* left.extractVariables();
                continue;
            }

            left.error('Invalid variable or pattern!');
        }
    }

    _toJS(o) {
        let jsvars = [];
        let type = (this.constant) ? 'const' : 'let';

        for (let declarator of this.declarators) {
            jsvars = jsvars.concat(declarator.toJS(o));
        }

        return new js.VariableDeclaration(jsvars, type)
            .from(this);
    }

    add(declarator) {
                this.declarators.push(declarator);
        return this;
    }

    addAndReturn(assignable, assignee) {
        let declarator =
            new VariableDeclarator(assignable, assignee);


        this.declarators.push(declarator);
        return this;
    }
}

export class VariableDeclarator extends Node {
    constructor(id, init = null) {
        super();

        this.id = id;
        this.init = init;
    }

    _toJS(o) {
        // always return an array

        let init = (!!this.init) ? this.init.toJS(o) : null;
        return new js.VariableDeclarator(this.id.toJS(o), init)
            .from(this);
    }
}

export class Expression extends Node {
    constructor() {
        super();
    }

    toStatement() {
        return new ExpressionStatement(this);
    }
}

export class ThisExpression extends Expression {
    _toJS(o) {
        return new js.ThisExpression();
    }
}

export class YieldExpression extends Expression {
    constructor(argument = null, delegate = false) {
        super(argument);

        this.argument = argument;
        this.delegate = delegate;
    }

    _toJS(o) {
        let inyield, pfunc = this.getParentFunction();
        if (pfunc === null || !pfunc.generator) {
            this.error('Yield expression only allowed inside a generator function!');
        }

        if (pfunc.async) {
            inyield = getJSMethodCall(
                [pfunc._ctrl, 'send'],
                [this.argument.toJS(o)]
                );
        } else {
            inyield = (!this.argument) ? null : this.argument.toJS(o);
        }


        return new js.YieldExpression(inyield, this.delegate)
            .from(this);
    }
}

export class AwaitExpression extends Expression {
    constructor(argument) {
        super(argument);

        this.argument = argument;
    }

    _toJS(o) {
        let pfunc = this.getParentFunction();
        if (pfunc === null || !pfunc.async) {
            this.error("Await expression only allowed in async function!");
        }

        return new js.YieldExpression(this.argument.toJS())
            .from(this);
    }
}

export class ArrayExpression extends Expression {
    constructor(elements) {
        super();

        this.elements = elements;
    }

    _toJS(o) {
        let array = [];
        for (let element of this.elements) {
            array.push(element.toJS(o));
        }
        return new js.ArrayExpression(array)
            .from(this);
    }
}

export class ObjectExpression extends Expression {
    constructor(properties) {
        super();

        this.properties = properties;
    }

    _toJS(o) {
        let props = [];
        for (let prop of this.properties) {
            props.push(prop.toJS(o));
        }

        return new js.ObjectExpression(props)
            .from(this);
    }
}

export class Assignable extends Node {

}



export class Property extends Node {
    constructor(key, value, kind = 'init') {
        super();

        this.key = key;
        this.value = value;
        this.kind = kind;
    }

    _toJS(o) {
        return new js.Property(
            this.key.toJS(o),
            this.value.toJS(o),
            this.kind
            ).from(this);
    }
}

export class SpreadElement extends Node {
    constructor(value) {
        super();

        this.value = value;
    }

    _toJS(o) {
        return new js.SpreadElement(this.value.toJS(o))
            .from(this);
    }
}




export class Pattern extends Node {
    * extractVariables() {
        throw new Error('Not implemented yet');
    }
}

export class SpreadPattern extends Pattern {
    constructor(pattern) {
        super();

        this.pattern = pattern;
    }

    _toJS(o) {
        return new js.RestElement(
            this.pattern.toJS(o)
            ).from(this);
    }

    * extractVariables() {
        if (this.pattern instanceof Identifier) {
            yield this.pattern.name;
        } else if (this.pattern instanceof Pattern) {
            yield* this.pattern.extractVariables();
        } else this.pattern.error('Token not allowed in Property alias!');
    }
}

export class PropertyAlias extends Pattern {
    constructor(identifier, pattern) {
        super();

        this.identifier = identifier;
        this.pattern = pattern;
    }

    _toJS(o) {
        return new js.AssignmentProperty(
            this.identifier.toJS(o),
            this.pattern.toJS(o)
            ).from(this);
    }

    * extractVariables() {
        if (this.pattern instanceof Identifier) {
            yield this.pattern.name;
        } else if (this.pattern instanceof Pattern) {
            yield* this.pattern.extractVariables();
        } else this.pattern.error('Token not allowed in Property alias!');
    }
}

export class ArrayPattern extends Pattern {
    constructor(patterns) {
        super();

        this.patterns = patterns;
    }

    _toJS(o) {
        const jsPatterns = [];
        for (var pattern of this.patterns) {
            jsPatterns.push(pattern.toJS(o));
        }

        return new js.ArrayPattern(jsPatterns).from(this);
    }

    hasSplat() {
        let i = 0;
        for (let param of this.patterns) {
            if (param instanceof SpreadPattern) {
                return i;
            }

            i++;
        }

        return -1;
    }

    * extractVariables() {
        for (let pattern of this.patterns) {
            if (pattern instanceof Identifier) {
                yield pattern.name;
            } else if (pattern instanceof Pattern) {
                yield* pattern.extractVariables();
            } else pattern.error(`Token not allowed in ArrayPattern`);
        }
    }
}

export class ObjectPattern extends Pattern {
    constructor(properties) {
        super();

        this.properties = properties;
    }

    _toJS(o) {
        const jsProperties = [];
        for (var property of this.properties) {
            if (property instanceof Identifier) {
                const id = property.toJS(o);
                jsProperties.push(
                    new js.AssignmentProperty(id, id)
                    );
            } else {
                jsProperties.push(property.toJS(o));
            }
        }

        return new js.ObjectPattern(jsProperties).from(this);
    }

    * extractVariables() {
        for (let pattern of this.patterns) {
            if (pattern instanceof Identifier) {
                yield pattern.name;
            } else if (pattern instanceof Pattern) {
                yield* pattern.extractVariables();
            } else pattern.error('Token not allowed in ObjectPattern');
        }
    }
}

export class DefaultPattern extends Pattern {
    constructor(pattern, expression) {
        super();

        this.pattern = pattern;
        this.expression = expression;
    }

    _toJS(o) {
        return new js.AssignmentPattern(
            this.pattern.toJS(o),
            this.expression.toJS(o)
            ).from(this);
    }

    * extractVariables() {
        if (this.pattern instanceof Identifier) {
            yield this.pattern.name;
        } else if (this.pattern instanceof Pattern) {
            yield* this.pattern.extractVariables();
        } else this.pattern.error('Token not allowed in ObjectPattern');
    }
}

export class Super extends Statement {
    _toJS(o) {
        return new js.Super().from(this);
    }
}

export class ClassExpression extends Expression {
	constructor(identifier = null, superClass = null, body = []) {
		super();


		this.identifier = identifier;
		this.superClass = superClass;
		this.body = body;
	}

	_toJS(o) {
	    let body = [], props = [], statprops = [];

	    for (let line of this.body) {
	        if (line instanceof MethodDefinition) {

	            if (line.value.async) {
	                // async methods are not supported in classes so instead they have
	                // to be added to the list of prototype properties
	                let bin = line.static ? statprops : props;
	                if (line.kind !== "method") {
	                    line.error(
	                        `"${line.kind}" method type not allowed as async in class definitions!`
	                        );
	                }

                    bin.push(
                        new js.Property(
                            line.key,
                            line.value.toJS(o)
                            )
                        );
	            } else
	                body.push(line.toJS(o));
	        } else if (line instanceof ClassProperty) {
	            props.push(line.toJS(o));
	        } else {
	            line.error('Class body item unrecognized!');
	        }
	    }

	    // create class
	    let superClass  = defined(this.superClass) ? this.superClass.toJS(o) : null;
	    let cls         = new js.ClassExpression(null, superClass, body);

	    if (props.length === 0 && statprops.length === 0) {
	        if (defined(this.identifier)) {
	            return getJSAssign(this.identifier.name, cls, 'const')
                    .from(this);
	        } else {
	            return cls.from(this);
	        }
	    } else {
            let classifyVar = this.program.util('classify');
	        let rapper = new js.CallExpression(
                new js.Identifier(classifyVar), [
    	            cls,
    	            new js.ObjectExpression(props)
    	        ]
            );

	        if (statprops.length > 0) {
	            rapper.arguments.push(
	                new js.ObjectExpression(statprops)
	                );
	        }

	        if (defined(this.identifier)) {
	            return getJSAssign(this.identifier.name, rapper, 'const')
                    .from(this);
	        } else {
	            return rapper.from(this);
	        }
	    }
	}

	* extractVariables() {
	    if (defined(this.identifier)) {
	        yield this.identifier.name;
	    } else {
	        this.error('Cannot extract name from anonymous class!');
	    }
	}
}

export class MethodDefinition extends Node {
	constructor(key, value, kind = "method", isStatic = false, computed = false) {
		super();


		this.key = key;
		this.value = value;
		this.kind = kind;
		this.static = isStatic;
		this.computed = computed;
	}

	_toJS(o) {
	    return new js.MethodDefinition(
	        this.key.toJS(o),
	        this.value.toJS(o),
	        this.kind,
	        this.computed,
	        this.static
	        ).from(this);
	}
}

export class ClassProperty extends Node {
    constructor(key, value, computed = false) {
        super();

        this.key = key;
        this.value = value;
        this.computed = computed;
    }

    _toJS(o) {
        return new js.Property(
            this.key.toJS(o),
            this.value.toJS(o),
            this.computed
            ).from(this);
    }
}


export class FunctionDeclaration extends Declaration {
    constructor(identifier, func) {
        super();

        this.identifier = identifier;
        this.func = func;
    }

    _toJS(o) {
        if (this.parent instanceof Property)
            return new js.Property(
                this.identifier,
                this.func.toJS(o)
                ).from(this);
        else {
            let scope = this.getParentScope();
            let expression = this.func.toJS(o);
            let name = this.identifier.name;

            if (scope.meta.functionDeclarations.has(name)) {
                line.error('Cannot declare function more than once!');
                return;
            }
            scope.meta.functionDeclarations.set(
                name,
                expression
            );

            return [];
        }
    }

    * extractVariables() {
        // yields only the function name
        yield this.identifier.name;
        return;
    }
}


export class FunctionExpression extends Expression {
    constructor(params, body, bound = false, modifier = '') {
        super();

        this.params = params;
        this.body = body;
        this.bound = bound;
        this.modifier = modifier;
    }

    hasSplat() {
        let i = 0;
        for (let param of this.params) {
            if (param instanceof SpreadPattern) {
                return i;
            }

            i++;
        }

        return -1;
    }

    _toJS(o) {
        let fn;

        if (this.modifier === '*') {
            fn = this.generatorToJs(o);
        } else if (this.modifier === '~') {
            fn = this.asyncToJs(o);
        } else if (this.modifier === '~*') {
            fn = this.asyncGeneratorToJs(o);
        } else {
            fn = this.regularToJs(o);
        }

        // if function is bound return <function expression>.bind(this)
        if (this.bound) {
            return new js.CallExpression(
                new js.MemberExpression(fn, new js.Identifier('bind')),
                [new js.ThisExpression()]
                ).from(this);
        } else {
            return fn.from(this);
        }
    }

    * walkParams() {
        for (let param of this.params) {
            let gen = this.body.walk();
            let skip = undefined;
            while (true) {
                let ctrl = gen.next(skip);
                if (ctrl.done)
                    return;
                const node = ctrl.value;

                if (node instanceof FunctionExpression) {
                    skip = true;
                } else {
                    skip = undefined;
                }

                yield node;
            }
        }
    }

    * walkBody() {
        let gen = this.body.walk();
        let skip = undefined;
        while (true) {
            let ctrl = gen.next(skip);
            if (ctrl.done)
                return;
            const node = ctrl.value;

            if (node instanceof FunctionExpression) {
                skip = true;
            } else {
                skip = undefined;
            }

            yield node;
        }
    }

    * walkFunction() {
        yield* this.walkParams();
        yield* this.walkBody();
    }

    regularToJs(o, noparams = false) {
        let body = this.body.toJS(o);
        if (!(body instanceof js.BlockStatement)) {
            const instructions = [
                new js.ReturnStatement(body)
            ];
            body = new js.BlockStatement(instructions);
        }

        let i = 0;


        return new js.FunctionExpression(
            null,
            noparams ? [] : this.params.map(
                param => param.toJS(o)
                ),
            body,
            null);
    }

    generatorToJs(o, noparams = false) {
        let jsnode = this.regularToJs(o, noparams);
        jsnode.generator = true;
        return jsnode;
    }

    asyncToJs(o, noparams = false) {
        let asyncVar = this.program.util('async');
        return new js.CallExpression(
            new js.Identifier(asyncVar),
            [this.generatorToJs(o, noparams)]
        );
    }

    asyncGeneratorToJs(o, noparams = false) {
        let ctrlVar = this._ctrl = this.program.vargen('ctrl');
        let gocVar = this.program.util('getObservableCtrl');
        let ctrl = getJSAssign(
            ctrlVar,
            new js.CallExpression(new js.Identifier(gocVar), []),
            'const');
        let mem = new js.AssignmentExpression(
            '=',
            getJSMemberExpression([ctrlVar, 'code']),
            new js.CallExpression(
                new js.MemberExpression(
                    this.asyncToJs(o, true),
                    new js.Identifier("bind")
                    ),
                [new js.ThisExpression()]
                )
            );
        let ret = new js.ReturnStatement(getJSMemberExpression([
            ctrlVar,
            'observable'
        ]));

        let block = new js.BlockStatement([ctrl, mem, ret].map(el => {
            if (el instanceof js.Expression) {
                return new js.ExpressionStatement(el);
            } else {
                return el;
            }
        }));


        return new js.FunctionExpression(
            null,
            noparams ? [] : this.params.map(p => p.toJS(o)),
            block);
    }

    get async() {
        return this.modifier.includes('~');
    }

    get generator() {
        return this.modifier.includes('*');
    }
}

export class SequenceExpression extends Expression {
    constructor(expressions) {
        super();

        this.expressions = expressions;
    }
}

export class UnaryExpression extends Expression {
    constructor(operator, argument, prefix = true) {
        super();

        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
    }

    _toJS(o) {
        var operator;
        if (this.operator in convert) {
            operator = convert[this.operator];
        } else {
            operator = this.operator;
        }

        if (!unaryOperators.has(operator)) {
            this.error('Invalid unary operator!');
        }

        return new js.UnaryExpression(
            operator,
            this.argument.toJS(o),
            this.prefix
            ).from(this);
    }
}

const smoothOperators = {
    '//=': function(left, right) {
        return getJSMethodCall(
            ['Math', 'floor'],
            [new js.BinaryExpression('/', left, right)]
            );
    },
    '^=': function(left, right) {
        return getJSMethodCall(
            ['Math', 'pow'],
            [left, right]
            );
    }
};

export class BinaryExpression extends Expression {
    constructor(operator, left, right) {
        super();

        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    _toJS(o) {
        let left = this.left.toJS(o);
        let right = this.right.toJS(o);
        let operator;

        if (this.operator in convert) {
            return new js.BinaryExpression(
                convert[this.operator],
                left,
                right
                ).from(this);
        }

        if ((this.operator + '=') in smoothOperators) {
            let fn = smoothOperators[this.operator + '='];
            return fn(left, right).from(this);
        }

        return new js.BinaryExpression(this.operator, left, right)
            .from(this);
    }
}

// this is different from other operaetor expressions cause
// bizubee supports chaining of comparisons as in if 1 < c < 10 do ...
export class ComparativeExpression extends Expression {
    constructor(operator, left, right) {
        super();

        this.operators = [operator];
        this.operands = [left, right];
    }

    // used by the parser to chain additional operators/operands to expression
    chain(operator, expression) {

        this.operators.push(operator);
        this.operands.push(expression);
        return this;
    }

    _toJS(o) {
        const [opid]    = this.getOpvars(1);
        const opvar     = new js.Identifier(opid);

        let
        left    = null,
        right   = null,
        prev    = null,
        out     = null
        ;


        for (let i = 0; i < this.operators.length; i++) {
            const lastiter = (i + 1 === this.operators.length);
            let
            jsRight,
            compare,
            originalOp = this.operators[i],
            op = (originalOp in convert) ? convert[originalOp] : originalOp
            ;

            left    = prev || this.operands[i].toJS(o);
            right   = this.operands[i + 1].toJS(o);

            if (right instanceof js.Identifier) {
                jsRight = right.toJS(o);
                prev = jsRight;
            } else {
                // the last expression will only be evaluated once, so no need to save it in opvar
                // otherwise we must save it to prevent reevaluation
                jsRight = (lastiter) ? right : new js.AssignmentExpression(
                    '=',
                    opvar,
                    right
                    );
                prev = opvar;
            }

            // the actual comparison expression
            compare = new js.BinaryExpression(
                op,
                left,
                jsRight
                );

            // at first the lefthand operand in the && expression is the initial comparison
            // after that it is always the previous && expression
            out = (out === null)
            ? compare
            : new js.LogicalExpression(
                '&&',
                out,
                compare
                )
            ;
        }

        return out.from(this);
    }
}

export class AssignmentExpression extends Expression {
    constructor(operator, left, right) {
        super();

        this.operator = assertAssignmentOperator(operator);
        this.left = left;
        this.right = right;
    }

    _toJS(o) {
        let rightHandSide;
        if (this.operator in smoothOperators) {
            let trans = smoothOperators[this.operator];
            let left = this.left.toJS(o);
            let right = trans(left, this.right.toJS(o));

            return new js.AssignmentExpression('=', left, right)
                .from(this);
        } else {
            return new js.AssignmentExpression(
                this.operator,
                this.left.toJS(o),
                this.right.toJS(o)
                ).from(this);
        }
    }
}

export class UpdateExpression extends Expression {
    constructor(operator, argument, prefix) {
        super();

        this.operator = assertUpdateOperator(operator);
        this.argument = argument;
        this.prefix = prefix;
    }
}

export class LogicalExpression extends Expression {
    constructor(operator, left, right) {
        super();

        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    _toJS(o) {
        return new js.LogicalExpression(
            this.operator,
            this.left.toJS(o),
            this.right.toJS(o)
            ).from(this);
    }
}

export class QuestionableExpression extends Expression {

    // compile some.weird?.property?.chain
    getChain(stack, heads, o) {
        throw new Error('Must implement getChain method!');
    }

    get subject() {
        throw new Error('Must implement subject getter!');
    }

    // compile some.weird?.property?.chain
    getChain(stack, heads, o) {
        if (this.doubtful) {
            const [op] = this.getOpvars(1);
            const id = new js.Identifier(op);
            const ref = this.getJSRef(id, o);
            const fn = (node) => {
                if (ref instanceof js.CallExpression) {
                    ref.callee = node;
                } else {
                    ref.object = node;
                }
            };

            if (this.subject instanceof QuestionableExpression) {
                stack.push(
                    this.subject.getChain(stack, heads, o)
                    );
            } else {
                stack.push(
                    this.subject.toJS(o)
                    );
            }

            heads.push([
                op,
                fn,
                this instanceof CallExpression
            ]);
            return ref;
        } else {
            const left = (this.subject instanceof QuestionableExpression) ?
                this.subject.getChain(stack, heads, o) :
                this.subject.toJS(o);

            return this.getJSRef(left, o);
        }
    }


    _toJS(o) {
        const stack = [], heads = [];
        const undie = new js.UnaryExpression(
            'void',
            new js.Literal(0)
            );
        stack.push(
            this.getChain(stack, heads, o)
            );

        var pointer = stack[stack.length - 1];
        for (var i = heads.length - 1; i >= 0; i--) {
            const [name, changeNode, isCall] = heads[i];
            const node = stack[i];
            if (isCall) {
                if (node instanceof js.MemberExpression) {
                    const id = new js.Identifier(name), prop = node.property;
                    if (node.computed) {
                        const [propHolder] = this.getOpvars(1);
                        const pid = new js.Identifier(propHolder);
                        changeNode(new js.MemberExpression(id, pid, true));
                        pointer = new js.ConditionalExpression(
                            new js.BinaryExpression(
                                '!=',
                                new js.MemberExpression(
                                    new js.AssignmentExpression(
                                        '=',
                                        id,
                                        node.object
                                        ),
                                    new js.AssignmentExpression('=', pid, prop),
                                    true
                                    )
                                ,
                                new js.Literal(null)
                                ),
                            pointer,
                            undie
                            );
                    } else {
                        changeNode(new js.MemberExpression(id, prop));
                        pointer = new js.ConditionalExpression(
                            new js.BinaryExpression(
                                '!=',
                                new js.MemberExpression(
                                    new js.AssignmentExpression(
                                        '=',
                                        id,
                                        node.object
                                        ),
                                    prop
                                    )
                                ,
                                new js.Literal(null)
                                ),
                            pointer,
                            undie
                            );
                    }
                    continue;
                }
            }

            pointer = new js.ConditionalExpression(
                new js.BinaryExpression(
                    '!=',
                    new js.AssignmentExpression(
                        '=',
                        new js.Identifier(name),
                        node
                        ),
                    new js.Literal(null)
                    ),
                pointer,
                undie
                );
        }

        return pointer.from(this);
    }

    getJSRef() {
        throw new Error("QE extendees must implement getJSRef!");
    }
}

export class CallExpression extends QuestionableExpression {
    constructor(callee, args, isNew = false, doubtful = false) {
        super();

        this.callee = callee;
        this.arguments = args;
        this.isNew = isNew;
        this.doubtful = doubtful;
    }

    getJSRef(subject, o) {
        const ctor = this.isNew ? js.NewExpression : js.CallExpression;
        return new ctor(
            subject,
            this.arguments.map(arg => arg.toJS(o))
            );
    }

    get subject() {
        return this.callee;
    }
}

export class NewExpression extends CallExpression {

}

export class MemberExpression extends QuestionableExpression {
    // doubtful parameter is true if there there are question marks involved
    constructor(object, property, computed = false, doubtful = false) {
        super();

        this.object = object;
        this.property = property;
        this.computed = computed;
        this.doubtful = doubtful;
    }

    getJSRef(subject, o) {
        return new js.MemberExpression(
            subject,
            this.property.toJS(o),
            this.computed
            );
    }

    get subject() {
        return this.object;
    }
}

export class DefinedExpression extends Expression {
    constructor(expression) {
        super();

        this.expression = expression;
    }

    _toJS(o) {
        return new js.BinaryExpression(
            '!=',
            this.expression.toJS(o),
            new js.Identifier('null')
            ).from(this);
    }
}

export class SwitchCase extends Node {
    constructor(test, consequent) {
        super();

        this.test = test;
        this.consequent = consequent;
    }
}

// the catch part of try-catch
export class CatchClause extends Node {
    constructor(param, body) {
        super();

        this.param = param;
        this.body = body;
    }

    _toJS(o) {
        return new js.CatchClause(
            this.param.toJS(o),
            this.body.toJS(o)
            ).from(this);
    }
}

export class Identifier extends Expression {
    constructor(name, process = true) {
        super();

        this.name = name;
    }

    onBuild() {
        this.program.forbid(this.name);
    }

    _toJS(o) {
        return new js.Identifier(this.name)
            .from(this);
    }
}

export class Literal extends Expression {
    constructor(value) {
        super();

        this.value = value;
    }
}

export class TemplateString extends Expression {

    // removes unnecessary escapes from string literals being translated to JS
    static removeEscapes(string) {
        const buff = []
        var escapeMode = false;
        for (var c of string) {
            if (escapeMode) {
                escapeMode = false;
                if (stringEscapeTable.hasOwnProperty(c)) {
                    buff.push(stringEscapeTable[c]);
                } else {
                    buff.push(c);
                }
            } else {
                if (c === '\\') {
                    escapeMode = true;
                    continue;
                } else {
                    buff.push(c);
                }
            }
        }

        return buff.join('');
    }

    constructor(value, parts) {
        super(value);

        this.parts = [];
        for (var part of parts) {
            // parts alternate between strings and arrays of tokens
            if (part instanceof Array) {
                // if part is Array of tokens, parse then search for Expression in AST
                // and reasign parent to this TemplateString

                var ctrl = parseRawTokens(part, {});
                if (ctrl.tree.body.length === 1) {
                    const node = ctrl.tree.body[0];
                    if (node instanceof ExpressionStatement) {
                        const expr = node.expression;
                        this.parts.push(expr);
                    } else {
                        this.parts.push(null);
                    }
                } else {
                    this.parts.push(null);
                }
            } else {
                this.parts.push(part);
            }
        }
    }

    _toJS(o) {
        const ctor = this.constructor;
        if (this.parts.length === 1) {              // if there is no interpolation
            return new js.Literal(ctor.removeEscapes(this.parts[0]))
                .from(this);
        } else if (this.parts.length > 2) {             // if interpolation exists in string
            let add = new js.BinaryExpression(
                '+',
                new js.Literal(ctor.removeEscapes(this.parts[0])),      // cause the first part is always a string
                this.parts[1].toJS(o)               // second part is an interpolation
                );
            for (var i = 2; i < this.parts.length; i++) {
                const part = this.parts[i];
                if (part === null) {                // if interpolated expression is invalid it is set to null in `parts`
                    this.error('Only single expressions allowed per interpolation!');
                }

                // parts alternate between expression and string
                if (part instanceof Expression) {
                    add = new js.BinaryExpression(
                        '+',
                        add,
                        part.toJS(o)
                        );
                } else if (part.constructor === String) {
                    add = new js.BinaryExpression(
                        '+',
                        add,
                        new js.Literal(
                            this.constructor.removeEscapes(part)
                            )
                        );
                } else {
                    part.error('Interpolated value not expression!');
                }
            }

            return add.from(this);
        } else {
            this.error('Internal compiler error!');
        }
    }
}

// a raw single quoted string
export class StringLiteral extends Literal {
    constructor(value) {
        super(value.substring(1, value.length - 1));
    }

    _toJS(o) {
        return new js.Literal(this.value)
            .from(this);
    }
}

export class NumberLiteral extends Literal {
    constructor(value) {
        super(value);
    }

    _toJS(o) {
        return new js.Literal(+this.value)
            .from(this);
    }
}

export class ModuleSpecifier extends Statement {
    constructor(local) {
        super();
        this.local = local;
    }
}


export class ModuleDeclaration extends Statement {

}


export class ImportSpecifier extends ModuleSpecifier {
    constructor(imported, local = null) {
        super(local || imported);

        this.imported = imported;
    }

    _toJS(o) {
        return new js.ImportSpecifier(
            this.local.toJS(o),
            this.imported.toJS(o)
            ).from(this);
    }
}

export class ImportNamespaceSpecifier extends ModuleSpecifier {
    _toJS(o) {
        return new js.ImportNamespaceSpecifier(this.local)
            .from(this);
    }
}

export class ImportDefaultSpecifier extends ModuleSpecifier {
    _toJS(o) {
        return new js.ImportDefaultSpecifier(this.local)
            .from(this);
    }
}

export class ImportDeclaration extends ModuleDeclaration {
    constructor(specifiers, source) {
        super();

        this.specifiers = specifiers;
        this.path = source;
    }

    _toJS(o) {
        return new js.ImportDeclaration(
            this.specifiers.map(specifier => specifier.toJS(o)),
            new js.Literal('' + this.path)
            ).from(this);
    }
}

class ExportDeclaration extends ModuleDeclaration {

}

export class ExportSpecifier extends ModuleSpecifier {
    constructor(local, exported = null) {
        super(local);

        this.exported = exported || local;
    }

    _toJS(o) {
        return new js.ExportSpecifier(
            this.local.toJS(o),
            this.exported.toJS(o)
            ).from(this);
    }
}

export class ExportNamedDeclaration extends ExportDeclaration {
    constructor(declaration, specifiers, source = null) {
        super();

        this.declaration = declaration;
        this.specifiers = specifiers;
        this.path = source;
    }

    _toJS(o) {
        if (this.declaration === null) {
            return new js.ExportNamedDeclaration(
                null,
                this.specifiers.map(spec => spec.toJS(o)),
                new js.Literal('' + this.path)
                )
                .from(this);
        } else {
            if (this.declaration instanceof FunctionDeclaration) {
                const name = this.declaration.identifier.name;

                if (this.program.meta.functionDeclarations.has(name)) {
                    this.declaration
                        .error('Function already exists!');
                }

                this.program.meta.functionDeclarations.set(
                    name,
                    declaration.func.toJS(o)
                    );

                return new js.ExportNamedDeclaration(
                    null,
                    new js.ExportSpecifier(new js.Identifier(name))
                    ).from(this);
            } else {
                return new js.ExportNamedDeclaration(
                    this.declaration.toJS(o)
                    ).from(this);
            }
        }
    }
}


export class ExportDefaultDeclaration extends ExportDeclaration {
    constructor(declaration) {
        super();

        this.declaration = declaration;
    }

    _toJS(o) {
        if (this.declaration instanceof FunctionDeclaration) {
            const name = this.declaration.identifier.name;

            if (this.program.meta.functionDeclarations.has(name)) {
                this.declaration
                    .error('Function already exists!');
            }

            this.program.meta.functionDeclarations.set(
                name,
                declaration.func.toJS(o)
                );

            return new js.ExportDefaultDeclaration(
                new js.Identifier(name)
                ).from(this);
        } else {
            return new js.ExportDefaultDeclaration(
                this.declaration.toJS(o)
                ).from(this);
        }
    }
}


export class ValueExpression extends Expression {
    constructor(statement) {
        super();
        this.statement = statement;
    }

    _toJS(o) {
        const parentFunc = this.getParentFunction();
        const body = this.statement.toJS(o);
        var block = (body instanceof Array)?
            new js.BlockStatement(body) :
            new js.BlockStatement([body]);

        if (parentFunc === null || parentFunc.modifier === '') {
            return new js.CallExpression(
                new js.FunctionExpression(
                    null,
                    [],
                    block
                    ),
                []
                );
        } else {
            return new js.YieldExpression(
                new js.CallExpression(
                    new js.FunctionExpression(
                        null,
                        [],
                        block,
                        true
                        ),
                    []
                    ),
                true
                );
        }
    }
}
