import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk'
import ccc_config from '../../ccc_init.json';
import {fileExists, getCWD} from "./files";

const main = async () => {
    const params = minimist(process.argv.splice(2), {
        boolean: ['help'],
        alias: {help: ['h']},
        default: {help: false},
    });

    if(params.help) {
        console.log(`Usage:\t npm run execute [levelNr] [fileName]
Examples: npm run execute 1 eq
          npm run execute 2 all
          npm run execute 4 1`)
        return;
    }

    const levelNumber = Number(params._[0]);
    const levelName = params._[1];

    if(isNaN(levelNumber) || levelNumber < 1 || levelNumber > ccc_config.numberOfLevels) {
        console.log(chalk.red(`levelNr must be a number and between 1 and ${ccc_config.numberOfLevels}`));
        return;
    }

    const inputFolder = path.join(ccc_config.inputDir, ccc_config.levelFolderPrefix + levelNumber);
    const outputFolder = path.join(ccc_config.outputDir, ccc_config.levelFolderPrefix + levelNumber);

    let files = [];

    if(params._[1] === 'all') {
        files = fs.readdirSync(inputFolder)
            .filter(f => f.endsWith(ccc_config.inputFileExtension))
            .map(f => f.slice(0, -ccc_config.inputFileExtension.length));
        if(files.length === 0) {
            console.log(chalk.red(`No input files found in folder ${inputFolder}`))
        }
    } else {
        files.push(
            ccc_config.levelFilePrefix.replace(/\${n}/g, levelNumber) +
            levelName
        );
    }

    for(let file of files) {
        const actFile = path.join(inputFolder, file + ccc_config.inputFileExtension);
        if(!fileExists(actFile)) {
            console.log(chalk.red(`Input file ${actFile} does not exist`));
            return;
        }
    }

    for(let file of files) {
        const inputData = fs.readFileSync(path.join(inputFolder, file + ccc_config.inputFileExtension), 'utf8');

        const {execute} = await import(path.join(getCWD(), 'build', ccc_config.mainFile));

        let output;
        try {
            output = await execute(inputData);
        } catch (e) {
            console.log(chalk.red(`Got error while executing file ${chalk.green(file)}:`));
            console.log(e);
            return;
        }

        console.log("Executed for file: " + chalk.green(file));
        fs.writeFileSync(path.join(outputFolder, file + ccc_config.outputFileExtension), output,'utf8');
    }
};

main()
    .catch((err) => console.log('Got error: ', err.message));