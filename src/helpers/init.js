import fs from 'fs'
import path from 'path'
import {dirExists, getBase, mkDirIfNotExists} from './files'
import clear from 'clear'
import chalk from 'chalk'
import figlet from 'figlet'
import inquirer from 'inquirer'

const main = async () => {
    clear();
    console.log(chalk.yellow(figlet.textSync('CCC Init', {horizontalLayout: 'full'})));
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
        }
    ];
    const answers = await inquirer.prompt(questions);

    if(answers.createDescription) mkDirIfNotExists('description');
    mkDirIfNotExists(answers.inputDir);
    mkDirIfNotExists(answers.outputDir);
    for(let i = 1; i <= answers.numberOfLevels; i++) {
        mkDirIfNotExists(path.join(answers.inputDir, 'level' + i))
        mkDirIfNotExists(path.join(answers.outputDir, 'level' + i))
    }
    fs.writeFileSync('ccc_init.json', JSON.stringify(answers, null, 2))
};

main()
    .catch((err) => console.log('Got error: ', err.message));