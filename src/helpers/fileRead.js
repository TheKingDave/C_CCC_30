export class FileRead {

    constructor(inputStr) {
        this.inputStr = inputStr;
        this.lines = inputStr.split('\n').map(l => l.trim());
        this.currentLine = 0;
    }

    /**
     * Read a line and returns an object with the names given in `names`. If `names` is not given returns array
     * @param names Names of the keys for the object
     */
    readLine(names) {
        const input = this.lines[this.currentLine].split(" ").map(i => i.trim()).filter(i => i !== '');
        this.currentLine++;
        if(Array.isArray(names)) {
            let unique = [...new Set(names)];
            if(names.length !== unique.length) {
                throw new Error("All names MUST be unique.");
            }
            if(names.length !== input.length) {
                throw new Error(`Input/Names length mismatch. Expected ${names.length} items but got ${input.length}.`);
            }
            const ret = {};
            let count = 0;
            for(let name of names) {
                ret[name] = input[count++];
            }
            return ret;
        } else {
            return input.map(i => isNaN(i) ? i : Number(i));
        }
    }

    readMatrix(x, y) {

    }

}