import {Person} from "./Person";


export class Alien {

    constructor(startX, startY, movement, id, speed, spawnTick) {
        this.startX = startX;
        this.startY = startY;
        this.movement = movement;
        this.id = id;
        this.speed = speed;
        this.spawnTick = spawnTick;
    }

    getPosAtTick(tick) {
        tick = (tick - this.spawnTick) * this.speed;
        const p = new Person(this.startX, this.startY);
        let tickCount = 0;
        for(let i = 0; i < this.movement.length; i++) {
            //console.log(this.movement[i], p.position, p.direction);
            if(this.movement[i] === 'F') {
                tickCount++;
                if(tickCount > tick) {
                    break;
                }
            }
            p.runCmd(this.movement[i]);

        }
        return p.position;
    }

}