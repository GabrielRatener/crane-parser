
import fs from "fs"
import {sanitize, raw} from "./postprocess"
import {Parser} from "./parser.out"

/*
const source = `

a:
	x y z
	a b aak
	\\weather "homie" a =>
		a + b!
		a.scoff jeremy!
		`;

*/

const source = fs.readFileSync(`${__dirname}/history/dsl.1.grammar`, 'utf8');
const parser = new Parser(source);

for (let token of sanitize(source)) {
	//console.log(token.type, token.loc)
	parser.push(token);
}

// console.log(JSON.stringify(parser.finish(), null, 4));