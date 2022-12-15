import { AbstractObject, Vector2D } from "./interfaces";

export class World extends AbstractObject {
    public width: number;
    public height: number;
    public backGroundColor = "#201A23";
    public ctx: any;

    constructor(ctx: any, t: number) {
        super(new Vector2D(400, 400), t)
        this.width = this.center.x * 2;
        this.height = this.center.y * 2;
        this.backGroundColor = "#201A23";
        this.ctx = ctx;
    }

    public draw(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.backGroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}