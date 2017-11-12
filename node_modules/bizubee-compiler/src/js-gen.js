
import * as bz from './bz-nodes';
import * as js from './js-nodes';
import nuVar from './vargen';

export function getJSVar(name, constant) {
    constant = constant || false;
    return new js.VariableDeclaration(
        [new js.AssignmentExpression(
            '=',
            new js.Identifier(name),
            init.toJS({})
        )],
        (constant) ? 'const' : 'let'
    );
}
export function getJSAssign(name, value, type) {
    let id = new js.Identifier(name);
    let assign = new js.AssignmentExpression(
        '=',
        id,
        value);
    if (type !== undefined && type !== null) {
        return new js.VariableDeclaration(
            [new js.VariableDeclarator(id, value)],
            type);
    } else {
        return new js.AssignmentExpression(
            '=',
            new js.Identifier(name),
            value);
    }
}

export function getJSDeclare(pattern, jvalue, type) {
    type = type || 'const';
    if (pattern instanceof bz.Node || pattern instanceof js.Identifier) {
        return new js.VariableDeclaration([
                new js.VariableDeclarator(pattern.toJS({}), jvalue)
            ], type);
    }

    if (pattern instanceof String) {
        return new js.VariableDeclaration([
                new js.VariableDeclarator(new js.Identifier(pattern), jvalue)
            ], type);
    }

    pattern.error('Invalid declaration type!');
}

export function getJSMethodCall(names, args) {
    return new js.CallExpression(
        exports.getJSMemberExpression(names), args);
}

export function getJSMemberExpression(names) {
    if (names.length === 0) {
        throw new Error('Must have at least one man!');
    } else {
        let lead = new js.Identifier(names[0]);
        for (let i = 1; i < names.length; i++) {
            lead = new js.MemberExpression(lead, new js.Identifier(names[i]));
        }

        return lead;
    }
}

export function getJSIterable(target) {
    return new js.CallExpression(
        new js.MemberExpression(
            target,
            exports.getJSMemberExpression(['Symbol', 'iterator']),
            true),
        []
        );
}

export function getJSConditional(identifier, def) {
    if (identifier instanceof js.Identifier) {
        return new js.ConditionalExpression(
            new js.BinaryExpression('===', identifier, new js.Identifier('undefined')),
            def,
            identifier
            );
    } else if (typeof identifier === 'string') {
        return exports.getJSConditional(new js.Identifier(identifier), def);
    } else {
        throw new Error('Conditional expression must use identifier!');
    }
}
