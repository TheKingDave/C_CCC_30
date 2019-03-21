# CCC javascript template
Template and helpers to participate at the [CCC](https://codingcontest.org)

This template exists to make it easier and more efficient to participate at the CCC with an JS application.  
It makes an abstraction layer between the files and the code you are programming so you dont need to
worry about file reading/writing.

## Using this template
First you need to run
```bash
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

## Your code
Your code **needs** to export a function with the name `execute(input): String` which takes on argument
and returns an string. The argument is the contents of the input file and the returned string is the
contents of the output file.

## Execute you code with an specific input
```bash
npm run execute [levelNr] [inputName]
```
levelNr: number of the level to execute (1, 2, 3, ...)  
inputName: name of the input to use (eg, 1, 2, ..., all) all is a special name as it executes your code on all files

### Build runner
There is a `buildRunner.js` which automatically transpiles your code to be use by node.
It is designed to be running in the background. While it is running it will overwrite your files in
`build/` which should not be a problem. It has one caveat, it does not delete files from build.
(be careful if you import files dynamically)  
Start it with
````bash
npm run runner
````

## Helpers
### fileRead.js
To import (use that what you need depending on node version/babel):
```js
import {FileRad} from './helpers/fileRead';
const {FileRead} = require('./helpers/fileRead');
```  
Example input from SCCC 29 Level 5 (Summit protection):
```text
3 3 3768 18
0 34 34
0 34 34
0 34 34
2
2 10
7 9
```
Use:
```js
// Initialize class
const fr = new FileRead('{e.g. input from file (supplied to execute as first argument) as string}');

// Get first row
const {rows, columns, threshold, velocity}  = fr.readLine(['rows', 'columns', 'threshold', 'velocity']);
// Read the two dimensional array
const twoDimArray = fr.readList(rows, columns);
console.log(twoDimArray); // [ [ 0, 34, 34 ], [ 0, 34, 34 ], [ 0, 34, 34 ] ]

// Get how many range/guardCount tuples there are
const {numRanges} = fr.readLine(['numRanges']);
// Read the range/guardCount tuples
const ranges = fr.readList(numRanges, ['range', 'guardCount']);
console.log(ranges); // [ { range: 2, guardCount: 10 }, { range: 7, guardCount: 9 } ]
```

## fileWrite.js
To import (use that what you need depending on node version/babel):
```js
import {FileRad} from './helpers/fileWrite';
const {FileRead} = require('./helpers/fileWrite');
```  

Example:
```js
// Initialize FileWrite
const fw = new FileWrite('output:');

// Writing an object to the output 
fw.writeObject({threshold, velocity}, ['velocity', 'threshold']);

const coordinates = [ {x: 0, y: 1}, {y: 5, x: 15} ];
// Writing a number/string to the output
fw.writeObject(coordinates.length);
// Writing an list of object to the output
fw.writeListOfObjects(coordinates, ['x', 'y']);
```
Output:
```text
output:
18 3768
2
0 1
15 5
```