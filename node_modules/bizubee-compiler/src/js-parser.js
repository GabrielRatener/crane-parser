
import {parse as esparse} from 'acorn';
import {generate} from './dep/escodegen';
import * as js from './js-nodes';
import {
	getJSMethodCall,
	getJSMemberExpression,
	getJSAssign
	} from './js-gen';

export default function parse(source) {
	const program	= esparse(source, {
		ecmaVersion: 6,
		sourceType: 'module',
	});

	return {
		getJSTree(o) {
			return program;
		},
		getJSText(o) {
			return escodegen.generate(program);
		}
	}
}
