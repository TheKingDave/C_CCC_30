import fs from 'fs'
import path from 'path'
import {dirExists, fileExists, getBase, mkDirIfNotExists} from './files'
import clear from 'clear'
import chalk from 'chalk'
import figlet from 'figlet'
import inquirer from 'inquirer'

const configFile = 'ccc_init.json';

const main = async () => {
    clear();
    console.log(chalk.yellow(figlet.textSync('CCC Init', {horizontalLayout: 'full'})));

    if(fileExists(configFile)) {

    }

    const questions = [
        {
            name: 'createDescription',
            type: 'list',
            message: 'Should a description directory be created?',
            // default: 'Yes',
            choices: [{name: 'Yes', value: true}, {name: 'No', value: false}]
        },
        {
            name: 'inputDir',
            type: 'input',
            message: 'Enter input file directory:',
            default: 'input',
        },
        {
            name: 'outputDir',
            type: 'input',
            message: 'Enter output file directory:',
            default: 'output',
        },
        {
            name: 'numberOfLevels',
            type: 'input',
            message: 'Enter the number of levels (int):',
            validate: (inp) => !isNaN(inp) && Number(inp) >= 1,
            filter: (inp) => Number(inp),
        },
        {
            name: 'levelPrefix',
            type: 'input',
            message: 'Enter the prefix for the level folders:',
            default: 'level',
        },
    ];
    const answers = await inquirer.prompt(questions);

    if(answers.createDescription) mkDirIfNotExists('description');
    mkDirIfNotExists(answers.inputDir);
    mkDirIfNotExists(answers.outputDir);
    for(let i = 1; i <= answers.numberOfLevels; i++) {
        mkDirIfNotExists(path.join(answers.inputDir, answers.levelPrefix + i))
        mkDirIfNotExists(path.join(answers.outputDir, answers.levelPrefix + i))
    }
    fs.writeFileSync(configFile, JSON.stringify(answers, null, 2))
};

main()
    .catch((err) => console.log('Got error: ', err.message));