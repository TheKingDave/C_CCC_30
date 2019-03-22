export const DirectionEnum = Object.freeze({up: {x: -1, y: 0}, down: {x: 1, y: 0}, left: {x: 0, y: -1}, right: {x: 0, y: 1}});

export class Direction {

    constructor(dir) {
        if(!dir) {
            dir = 'right';
        }
        this.dir = dir;
    }

    getDirection() {
        return DirectionEnum[this.dir];
    }

    turnClock() {
        switch (this.dir) {
            case 'right':
                this.dir = 'down';
                break;
            case 'down':
                this.dir = 'left';
                break;
            case 'left':
                this.dir = 'up';
                break;
            case 'up':
                this.dir = 'right';
                break;
        }
    }

}