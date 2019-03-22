export class Tower {

    constructor(damage, range, position, spawnTick) {
        this.spawned = false;
        this.target = null;

        this.damage = damage;
        this.range = range;
        this.position = position;
        this.spawnTick = spawnTick;
    }

    setGame(game) {
        this.game = game;
    }

    getNearestAlien() {
        const disAlien = this.game.aliens
            .filter(a => a.health > 0 && a.spawned)
            .map(a => ({dis: a.position.getDistance(this.position), a}))
            .filter(da => da.dis <= this.range)
            .sort((a, b) =>
                (a.dis > b.dis)
                    ? 1
                    : (a.dis === b.dis)
                    ? ((a.a.id > b.a.id) ? 1 : (a.a.id < b.a.id) ? -1: 0) : -1);

        return disAlien.length > 0 ? disAlien[0].a : null;
    }

    simulateTick(tickNum) {
        if (tickNum >= this.spawnTick) {
            this.spawned = true;
        }
    }

    lock() {
        if (!this.spawned) {
            return;
        }
        // Check if alien is still there if locked
        if (this.target) {
            if (this.target.health <= 0) {
                this.target = null;
            } else if (this.target.position.getDistance(this.position) > this.range) {
                this.target = null;
            }
        }
        // If not lock lock to nearest alien
        if(!this.target) this.target = this.getNearestAlien();
    }

    shoot() {
        if(this.target) {
            this.target.health -= this.damage;
        }
    }

    toString() {
        return `Tower: {spawned: ${this.spawned}, target: ${this.target ? this.target.toString() : 'null'}}`;
    }

}
