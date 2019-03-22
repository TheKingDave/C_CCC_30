export class Command {

    constructor(cmd, times) {
        this.cmd = cmd;
        this.times = Number(times);
    }

    toCmdList() {
        const ret = [];
        for(let i = 0; i < this.times; i++) {
            ret.push(this.cmd);
        }
        return ret;
    }

}