import {FileRead} from "./helpers/fileRead";
import {FileWrite} from "./helpers/fileWrite";
// This is main program

export const execute = (input) => {
    const fr = new FileRead(input);
    const {rows, columns, threshold, velocity}  = fr.readLine(['rows', 'columns', 'threshold', 'velocity']);
    const twoDimArray = fr.readList(rows, columns);
    console.log(twoDimArray); // [ [ 0, 34, 34 ], [ 0, 34, 34 ], [ 0, 34, 34 ] ]
    const {numRanges} = fr.readLine(['numRanges']);
    const ranges = fr.readList(numRanges, ['range', 'guardCount'])
    console.log(ranges); // [ { range: 2, guardCount: 10 }, { range: 7, guardCount: 9 } ]

    const fw = new FileWrite('output:');
    fw.writeObject({threshold, velocity}, ['velocity', 'threshold']);
    const coordinates = [ {x: 0, y: 1}, {y: 5, x: 15} ];
    fw.writeObject(coordinates.length);
    fw.writeListOfObjects(coordinates, ['x', 'y']);

    return fw;
};
