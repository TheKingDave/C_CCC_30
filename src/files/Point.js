export class Point {

    constructor(x, y) {
        if (x instanceof Point) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    moveDirection(direction) {
        this.x = this.x + direction.x;
        this.y = this.y + direction.y;
    }

    clamp(width, height) {
        this.x = Math.max(0, Math.min(height - 1, this.x));
        this.y = Math.max(0, Math.min(width - 1, this.y));
    }

    toString() {
        return this.y + " " + this.x;
    }

    equals(p) {
        if (p instanceof Point) {
            return this.x === p.x && this.y === p.y;
        }
        return false;
    }

}