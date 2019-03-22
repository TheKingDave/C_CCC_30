import easystarjs from 'easystarjs';

export class aStar {

    constructor(grid, acceptable) {
        if (!acceptable) {
            acceptable = [0];
        }

        this.easystar = new easystarjs.js();
        this.easystar.setGrid(grid);
        this.easystar.setAcceptableTiles(acceptable);
    }

    findPath(startX, startY, endX, endY) {
        return new Promise((resolve, reject) => {
            this.easystar.findPath(startX, startY, endX, endY, function (path) {
                resolve(path);
            });
            this.easystar.calculate();
        })

    }

}