export class FileWrite {

    constructor(startString) {
        if(!startString) startString = '';

        this.string = '';
        this.writeNextLine(startString);
    }

    getOutputString() {
        return this.string;
    }

    /**
     * Adds the next line to the output;
     * @param line Line to add
     */
    writeNextLine(line) {
        this.string += line + '\n';
    }

    toString() {
        return this.string;
    }

    /**
     * Write an object to the output, using the names as the order
     * @param object Object to write
     * @param names Array of string for the keys
     */
    writeObject(object, names) {
        let line = '';
        if(Array.isArray(names)) {
            for(let name of names) {
                if(!object.hasOwnProperty(name)) {
                    throw new Error(`Object has no property named ${name}`);
                }
                line += object[name] + ' ';
            }
        } else if(!isNaN(names)) {
            if(!Array.isArray(object)) {
                throw new Error(`Object needs to be an array if names is a number`);
            }
            if(object.length !== names) {
                throw new Error(`Array length mismatch. Expected: ${names} but got ${object.length}`);
            }
            line = object.join(' ');
        } else {
            line = object.toString();
        }
        this.writeNextLine(line.trim());
    }

    /**
     * Writes an list of objects to the output
     * @param objects Array of objects
     * @param names Passed to writeObject(object, names)
     * @param number If supplied check for correct number
     */
    writeListOfObjects(objects, names, number) {
        if(!Array.isArray(objects)) {
            throw new Error(`objects needs to be an array`);
        }
        if(!isNaN(number) && objects.length !== number) {
            throw new Error(`Array length mismatch. Expected: ${number} but got ${objects.length}`);
        }
        for(let object of objects) {
            this.writeObject(object, names);
        }
    }

}