
import fs from 'fs'
import {parse} from './src/parser'

const input = process.argv[2];
const output = process.argv[3];
const api = parse(fs.readFileSync(input, 'utf8'));

fs.writeFileSync(output, api.getJSText({}), 'utf8');
