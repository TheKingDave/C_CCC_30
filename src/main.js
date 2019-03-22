import {FileRead} from "./helpers/fileRead";
import {FileWrite} from "./helpers/fileWrite";
import {aStar} from "./helpers/aStar";
import {Person} from "./files/Person";
import {Command} from "./files/Command";
import {Point} from "./files/Point";
import {Alien} from "./files/Alien";
import {Tower} from "./files/Tower";
import {Game} from "./files/Game";

// This is main program

class Main {

    constructor(input) {
        this.fr = new FileRead(input);
        this.fw = new FileWrite();
    }

    async execute() {
        const {width, height} = this.fr.readLine(['width', 'height']);

        const {startX, startY} = this.fr.readLine(['startX', 'startY']);
        const p = new Person(startX, startY);

        const moveLine = this.fr.readLine();
        const cmds = [];
        for (let i = 0; i < moveLine.length; i += 2) {
            cmds.push(new Command(moveLine[i], moveLine[i + 1]));
        }
        const movement = this.extrapolateMovement(cmds);

        const {health, speed} = this.fr.readLine(['health', 'speed']);

        const {numAliens} = this.fr.readLine(['numAliens']);
        const spawnTimes = this.fr.readList(numAliens, 1);

        const {damage, range} = this.fr.readLine(['damage', 'range']);

        const {numTowers} = this.fr.readLine(['numTowers']);
        const towerPositions = this.fr.readList(numTowers, 2);

        const towers = [];
        for(let towerPosition of towerPositions) {
            const [x, y] = towerPosition;
            towers.push(new Tower(damage, range, new Point(x, y), 0));
        }

        const aliens = [];
        for(let i = 0; i < numAliens; i++) {
            aliens.push(new Alien(startX, startY, movement, i, health, speed, Number(spawnTimes[i])));
        }

        const game = new Game(aliens, towers, width, height);

        // Run simulation
        let out = true;
        let tick = 0;
        while(out === true) {
            out = game.simulateTick(tick++);
            /*if(tick > 20) {
                return;
            }*/
        }

        this.fw.writeNextLine(out);
    }

    extrapolateMovement(cmds) {
        const ret = [];
        for(let cmd of cmds) {
            ret.push(...cmd.toCmdList());
        }
        return [...ret, 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'];
    }

}

export const execute = async (input) => {
    const main = new Main(input);
    await main.execute();
    return main.fw;
};
