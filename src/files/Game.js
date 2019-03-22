export class Game {

    constructor(aliens, towers, width, height) {
        this.width = width;
        this.height = height;
        this.aliens = aliens;
        this.towers = towers;

        for(let alien of this.aliens) {
            alien.setGame(this);
        }

        for(let tower of this.towers) {
            tower.setGame(this);
        }
    }

    simulateTick(tickNum) {
        console.log('simulate', tickNum);

        // update the alien positions
        for(let alien of this.aliens) {
            alien.simulateTick(tickNum);
        }
        // check if any alien has reached the end
        for(let alien of this.aliens) {
            if(alien.spawned && (alien.position.x > this.height || alien.position.y > this.width)) {
                return `${tickNum}\nLOSS`
            }
        }
        // spawn new aliens
        for(let alien of this.aliens) {
            alien.spawn(tickNum);
        }

        // simulate tower shots
        // check if it is locked and the locked in target is valid
        for(let tower of this.towers) {
            tower.lock();
        }
        // if it had a valid target or has just found a new one, deal damage to target
        for(let tower of this.towers) {
            tower.shoot();
        }
        for(let tower of this.towers) {
            tower.simulateTick(tickNum);
        }

        // check for dead aliens
        this.aliens = this.aliens.filter(a => a.health > 0);

        console.log(this.aliens.filter(a => a.spawned).map(a => a.toString()));
        console.log(this.towers.map(a => a.toString()));

        // check if all aliens are dead and no more will be spawning
        if(this.aliens.length === 0) {
            return `${tickNum}\nWIN`
        }

        return true;
    }

}