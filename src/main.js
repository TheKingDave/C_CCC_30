import {FileRead} from "./helpers/fileRead";
// This is main program

export const execute = (input) => {
    const fr = new FileRead(input);
    const {rows, columns, threshold, velocity}  = fr.readLine(['rows', 'columns', 'threshold', 'velocity']);
    const twoDimArray = fr.readList(rows, columns);
    console.log(twoDimArray); // [ [ 0, 34, 34 ], [ 0, 34, 34 ], [ 0, 34, 34 ] ]
    const {numRanges} = fr.readLine(['numRanges']);
    const ranges = fr.readList(numRanges, ['range', 'guardCount'])
    console.log(ranges); //
};
