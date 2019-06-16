#!/usr/bin/env node --experimental-modules

const {readFile} = require('fs');
const {version} = require('../package.json');
const {join} = require('path');
const commander = require('commander');

import(`${__dirname}/../src/index.mjs`)
	.then((module) => {

		commander
			.version(version)
			.option('-r, --root', 'Non-terminal to use as root')
            .option('-d, --debug', 'Run parser-generator in debug mode')
            .action((file, opts) => {
                const path = join(process.cwd(), file);

                readFile(path, 'utf8', (err, code) => {

                    if (err) {
                        console.error(`File "${path}" not found`);
                    } else {
                        const output = module.default(code, {
                            rootName: opts.root || null,
                            debug: !!opts.debug
                        });
                        console.log(output);        
                    }
                });
            })
            .parse(process.argv);
	});

