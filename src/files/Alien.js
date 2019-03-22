import {Person} from "./Person";
import {Point} from "./Point";


export class Alien {

    constructor(startX, startY, movement, id, health, speed, spawnTick) {
        this.spawned = false;

        this.startX = startX;
        this.startY = startY;
        this.movement = movement;
        this.id = id;
        this.health = health;
        this.speed = speed;
        this.spawnTick = spawnTick;
        this.position = null;
    }

    setGame(game) {
        this.game = game;
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

    simulateTick(tickNum) {
        if(this.spawned) {
            this.position = this.getPosAtTick(tickNum);
        }
    }

    spawn(tickNum) {
        if(!this.spawned && tickNum >= this.spawnTick) {
            this.spawned = true;
            this.position = new Point(this.startX, this.startY);
        }
    }

    toString() {
        return `Alien {id: ${this.id}, tick: ${this.spawnTick}, spawned: ${this.spawned}, health: ${this.health}, position: ${this.position}}`
    }


}