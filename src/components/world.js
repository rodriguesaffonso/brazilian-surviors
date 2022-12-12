class World extends AbstractObject {
    constructor(ctx) {
        super({ x: 400, y: 400 })
        this.width = this.center.x * 2;
        this.height = this.center.y * 2;
        this.backGroundColor = "#201A23";
        this.ctx = ctx;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.backGroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}