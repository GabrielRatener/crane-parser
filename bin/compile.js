#!/usr/bin/env node

const minimist = require('minimist');
const tangler = require('tangler');
const {readFileSync} = require('fs');
const {version} = require('../package.json');
const {join} = require('path');

const {_: [file], root} = minimist(process.argv.slice(2), {
    alias: {
        root: 'r'
    }
});

const path = join(process.cwd(), file);

const code = readFileSync(path, 'utf8');

const output =
  tangler
    .require(`${__dirname}/../src/index.js`)
    .default(code, {rootName: root || null});

console.log(output);
