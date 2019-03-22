import {FileRead} from "./helpers/fileRead";
import {FileWrite} from "./helpers/fileWrite";
import {aStar} from "./helpers/aStar";
import {Person} from "./files/Person";
import {Command} from "./files/Command";
import {Point} from "./files/Point";

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
        let lastPoint = new Point(p.position);
        this.fw.writeNextLine(p.position);
        for (let i = 0; i < moveLine.length; i += 2) {
            const cmd = new Command(moveLine[i], moveLine[i + 1]);
            for(let a = 0; a < cmd.times; a++) {
                p.runCmd(cmd.cmd);
                p.position.clamp(width, height);
                if(!p.position.equals(lastPoint)) {
                    this.fw.writeNextLine(p.position);
                    lastPoint = new Point(p.position);
                }
            }
        }
    }

}

export const execute = async (input) => {
    const main = new Main(input);
    await main.execute();
    return main.fw;
};
