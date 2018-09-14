#!/usr/bin/env node --experimental-modules

const minimist = require('minimist');
const tangler = require('tangler');
const {readFileSync} = require('fs');
const {version} = require('../package.json');
const {join} = require('path');

const {_: [file], root, debug} = minimist(process.argv.slice(2), {
    alias: {
        root: 'r',
        debug: 'd'
    }
});

const path = join(process.cwd(), file);

const code = readFileSync(path, 'utf8');

import(`${__dirname}/../src/index.mjs`)
	.then((module) => {
		const output = module.default(code, {rootName: root || null, debug: !!debug});
		console.log(output);
	});

