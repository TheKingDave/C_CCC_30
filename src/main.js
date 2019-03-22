import {FileRead} from "./helpers/fileRead";
import {FileWrite} from "./helpers/fileWrite";
// This is main program

class Color {
    constructor(obj) {
        this.r = obj.r;
        this.g = obj.g;
        this.b = obj.b;
    }
}

export const execute = (input) => {
    const fr = new FileRead(input);
    const fw = new FileWrite();

    const {tupels} = fr.readLine(['tupels']);
    console.log(fr.readObjectGrid(['r', 'g', 'b'], 2, tupels, (v) => new Color(v)));

    return fw;
};
