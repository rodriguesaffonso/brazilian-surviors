class Player extends AbstractObject {
    width = 10;
    height = 10;
    backgroundColor = "#8DAA9D";

    vx = 0;
    vy = 0;
    dv = 2;

    constructor(ctx, map) {
        super(map.center)
        this.ctx = ctx;
        this.map = map;

        this.maxHp = 100;
        this.hp = 100;
        this.damage = 15;
    }

    draw() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.center.x - this.width / 2, this.center.y - this.height / 2, this.width, this.height);
        
        this.ctx.font = "24px serif";
        this.ctx.fillText(`HP: ${this.hp} / ${this.maxHp}`, 10, 30);
    }

    setMovmentState(keyState) {
        this.vx = keyState["d"] ? this.dv : 0;
        this.vx += keyState["a"] ? -this.dv : 0;
        this.vy = keyState["s"] ? this.dv : 0;
        this.vy += keyState["w"] ? -this.dv : 0;
    }

    move() {
        this.center.x += this.vx;
        this.center.y += this.vy;
    }

    hit(object) {
        this.hp -= object.attack();
        if (this.hp < 0) {
            this.hp = 0;
        }
        console.log(this.hp);
    }
}