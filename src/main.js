import {FileRead} from "./helpers/fileRead";
// This is main program

export const execute = (input) => {
    const fr = new FileRead(input);

    console.log(fr.readLine());
    fr.currentLine = 0;
    console.log(fr.readLine(['mx', 'my', 'arg1', 'arg2']));

    return "testing";
};