# CCC javascript template
Template and helpers to participate at the [CCC](https://codingcontest.org)

## Using this template
First you need to run
```sh
npm run init
```
and answer the questions. They should normally just be accepted as is.

#### Detailed description of parameters:
* createDescription: If a directory named 'description' should be created. This is for the descriptions.pdf files.
* inputDir: The name of the directory where the input level directories should be created.
* inputFileExtension: Which extension to use on the input files
* outputDir: The name of the directory where the output level directories should be created.
* outputFileExtension: Which extension to use on the output files
* numberOfLevels: How many levels are in this CC
* levelFolderPrefix: The prefix of the folders for the levels
* levelFilePrefix: The prefix of the files for the level (`${n}` will be replaced by the level)
* mainFile: The name of the `main` file which will be imported and the function `execute` will be executed with the
input as first parameter. The return should be a string and will be saved in the output file.

