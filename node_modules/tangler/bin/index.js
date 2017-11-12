#!/usr/bin/env node

const path = require('path');
const tangler = require('../src/index');

process.on('uncaughtException', (err) => {
	console.log(tangler.transformStack(err.stack));
	process.exit(1);
});

tangler.run(path.resolve(process.argv[2]));
