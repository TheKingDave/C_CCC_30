import nodemon from 'nodemon';
import {transformFileAsync} from '@babel/core';
import path from 'path';
import fs from 'fs';
import chalk from "chalk";
import {fileExists, getCWD, rmFileIfExists} from "./files";

nodemon({
    // exec: 'echo > /dev/null' // for linux users
    exec: 'echo >nul',
    watch: ['src/'],
    ext: "js",
});

const cwd = getCWD();

const trans = async (files) => {
    console.log(chalk.green('TRANSPILE', files));
    await Promise.all(
        files.map(async f => {
            try {
                const srcPath = path.join('src', f);
                const buildPath = path.join('build', f);

                if (fileExists(srcPath)) {
                    const {code} = await transformFileAsync(srcPath);
                    fs.mkdirSync(path.dirname(buildPath), {recursive: true});
                    fs.writeFileSync(buildPath, code, 'utf8');
                } else {
                    rmFileIfExists(buildPath);
                }
            } catch (err) {
                console.log(chalk.red('ERROR: ', err))
            }
        })
    )
};

nodemon.on('restart', (files) => {
    if (Array.isArray(files)) {
        trans(files
            .map(f => path.relative(cwd, f).replace('src\\', ''))
            .filter(f => !f.match(/^helpers[/\\]/))
        );
    }
});