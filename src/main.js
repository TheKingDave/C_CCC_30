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

    const grid = [[0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]];

    const as = new aStar(grid);
    console.log(await as.findPath(0, 0, 4, 0));

    return fw;
};
