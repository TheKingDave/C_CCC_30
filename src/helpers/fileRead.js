import {isFunction} from "./helpers";

const defaultFormatter = i => isNaN(i) ? i : Number(i);

export class FileRead {

    constructor(inputStr) {
        this.inputStr = inputStr;
        this.lines = inputStr.split('\n').map(l => l.trim());
        this.currentLine = 0;
    }

    /**
     * Gets the next line from inputStr and increases currentLine
     * @returns {String} the next line
     */
    getNextLine() {
        if(this.lines.length <= this.currentLine) {
            throw new Error("Reached end of input");
        }
        return this.lines[this.currentLine++];
    }

    /**
     * Read a line and returns an object with the names given in `names`. If `names` is not given returns array
     * @param names Names of the keys for the object, if it is a number expect that many inputs
     * @param format Format function for every element. If not present uses default formatter (converts numbers to numbers)
     */
    readLine(names, format) {
        if(!isFunction(format)) {
            format = defaultFormatter;
        }

        const input = this.getNextLine().split(" ").map(i => i.trim()).filter(i => i !== '');

        if(Array.isArray(names)) {
            let unique = [...new Set(names)];
            if (names.length !== unique.length) {
                throw new Error("All names MUST be unique.");
            }
            if (names.length !== input.length) {
                throw new Error(`Input/Names length mismatch. Expected ${names.length} items but got ${input.length}.`);
            }
            const ret = {};
            let count = 0;
            for (let name of names) {
                ret[name] = format(input[count++]);
            }
            return ret;
        }else if(!isNaN(names)) {
            if(input.length !== names) {
                console.log(input);
                throw new Error(`Input/Length mismatch. Expected ${names} items but got ${input.length}.`)
            }
        }
        return input.map(format);
    }

    /**
     * Method to read a list of elements (if columns is a number 2-dim array, if array of strings object as in readline)
     * @param rows Rows to read
     * @param columns Columns to read/expect
     * @param format Format function for every element. If not present uses default formatter (converts numbers to numbers)
     */
    readList(rows, columns, format) {
        const ret = [];

        for(let i = 0; i < rows; i++) {
            ret.push(this.readLine(columns, format));
        }

        return ret;
    }

}