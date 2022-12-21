import { CommandParms, GraphicComponent } from "../../components";
import { Bullet } from "./bullet";

export class BulletGraphicComponent extends GraphicComponent {
    public ctx: CanvasRenderingContext2D;
    public backgroundColor = "white";
    public radius = 2;

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public update(bullet: Bullet, params: CommandParms): void {
        const relativePosition = bullet.getPosition().sub(bullet.camera.getCanvasLimits().minP);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.beginPath();
        this.ctx.arc(relativePosition.x, relativePosition.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}