#!/usr/bin/env node

import fs from "fs"
import pathUtils from "path"
import commander from "commander"
import url from "url"

const dir = pathUtils.dirname(url.fileURLToPath(import.meta.url));

(async() => {

    const {version} = JSON.parse(await fs.promises.readFile(`${dir}/../package.json`, 'utf8'));
    const module = await import(`../src/index.js`);

    commander
        .version(version)
        .option('-r, --root', 'Non-terminal to use as root')
        .option('-d, --debug', 'Run parser-generator in debug mode')
        .action((file, opts) => {
            if (typeof file !== 'string') {
                console.error("No file specified!");
                console.error('Exiting...');

                process.exit(1);
            
                return;
            }

            const path = pathUtils.join(process.cwd(), file);

            fs.readFile(path, 'utf8', (err, code) => {

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
})();
