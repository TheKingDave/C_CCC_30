import {FileRead} from "./helpers/fileRead";
import {FileWrite} from "./helpers/fileWrite";
import {aStar} from "./helpers/aStar";
import {Person} from "./files/Person";
import {Command} from "./files/Command";
import {Point} from "./files/Point";
import {Alien} from "./files/Alien";

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

        const {speed} = this.fr.readLine(['speed']);

        const {numAliens} = this.fr.readLine(['numAliens']);
        const spawnTimes = this.fr.readList(numAliens, 1);

        const {numQuery} = this.fr.readLine(['numQuery']);
        const queries = this.fr.readList(numQuery, 2);


        const aliens = [];
        for(let i = 0; i < numAliens; i++) {
            aliens.push(new Alien(startX, startY, movement, i, speed, Number(spawnTimes[i])));
        }

        for(let query of queries) {
            const [tick, alien] = query;
            const pos = aliens[alien].getPosAtTick(tick);
            this.fw.writeNextLine(tick + " " + alien + " " + pos.toString());
        }
    }

    extrapolateMovement(cmds) {
        const ret = [];
        for(let cmd of cmds) {
            ret.push(...cmd.toCmdList());
        }
        return ret;
    }

}

export const execute = async (input) => {
    const main = new Main(input);
    await main.execute();
    return main.fw;
};
