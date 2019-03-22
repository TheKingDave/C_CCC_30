import {Direction} from "./Direction";
import {Point} from "./Point";

export class Person {

    constructor(startX, startY) {
        this.position = new Point(startY, startX);
        this.direction = new Direction();
    }

    runCmd(cmdStr) {
        if(cmdStr === 'F') {
            this.position.moveDirection(this.direction.getDirection());
        } else if(cmdStr === 'T') {
            this.direction.turnClock();
        }
    }

}