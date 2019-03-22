import {FileRead} from "./helpers/fileRead";
import {FileWrite} from "./helpers/fileWrite";
import {aStar} from "./helpers/aStar";

// This is main program

class Color {
    constructor(obj) {
        this.r = obj.r;
        this.g = obj.g;
        this.b = obj.b;
    }
}

export const execute = async (input) => {
    const fr = new FileRead(input);
    const fw = new FileWrite();



    return fw;
};
