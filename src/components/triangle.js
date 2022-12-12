class Triangle extends AbstractObject {
    backgroundColor = "#8DAA9D";

    center = { x: 100, y: 100 }
    dv = 2;

    constructor(center, player) {
        super(center);
        this.player = player
        this.edgeLength = 10;
        if (center) {
            this.center.x = center.x;
            this.center.y = center.y;
        }
        this.maxHp = 10;
        this.hp = 10;
        this.damage = 8;
    }

    draw() {
        ctx.fillStyle = this.backgroundColor;
        const sqrt3 = Math.sqrt(3);
        ctx.beginPath();
        ctx.moveTo(this.center.x - this.edgeLength / 6, this.center.y - this.edgeLength * sqrt3 / 6);
        ctx.lineTo(this.center.x + this.edgeLength * 5 / 6, this.center.y - this.edgeLength * sqrt3 / 6);
        ctx.lineTo(this.center.x + this.edgeLength / 3, this.center.y + this.edgeLength * sqrt3 / 3);
        ctx.fill();
    }

    move() {
        const dist = this.distance(this.player);
        if (dist < this.dv) {
            return;
        }

        this.center.x = this.dv / dist * this.player.center.x + (1 - this.dv / dist) * this.center.x;
        this.center.y = this.dv / dist * this.player.center.y + (1 - this.dv / dist) * this.center.y;
    }

    touch(p) {
        return this.distance(p) < this.edgeLength;
    }

    attack() { return this.damage; }

    distance(p) {
        return Math.sqrt((this.center.x - p.center.x) ** 2 + (this.center.y - p.center.y) ** 2);
    }
}