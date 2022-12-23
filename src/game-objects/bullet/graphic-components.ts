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
        if (!this.insideRenderLimits(bullet)) {
            console.log(bullet, 'outside of limits');
            return;

        }

        const relativePosition = bullet.getPosition().sub(bullet.camera.getCanvasLimits().minP);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.beginPath();
        this.ctx.arc(relativePosition.x, relativePosition.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    private insideRenderLimits(bullet: Bullet): boolean {
        const canvasLimits = bullet.camera.getCanvasLimits();
        const tPosition = bullet.getPosition();
        return tPosition.x >= canvasLimits.minP.x * 1.1
            && tPosition.y >= canvasLimits.minP.y * 1.1
            && tPosition.x <= canvasLimits.maxP.x * 1.1
            && tPosition.y <= canvasLimits.maxP.y * 1.1;
    }
}