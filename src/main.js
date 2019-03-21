import {FileRead} from "./helpers/fileRead";
// This is main program

export const execute = (input) => {
    const fr = new FileRead(input);

    console.log(fr.readLine());
    fr.currentLine = 0;
    const {rows, columns} = fr.readLine(['rows', 'columns', 'threshold', 'v']);

    console.log(fr.readList(rows, columns));

    const {numRanges} = fr.readLine(['numRanges']);
    console.log(fr.readList(numRanges, ['range', 'count']));

    return "testing";
};
