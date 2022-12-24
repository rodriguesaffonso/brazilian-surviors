import { CommandParms, GraphicComponent } from "../../../components";
import { Game } from "../../../game";
import { MagicPistolBullet } from "./magic-pistol-bullet";

export class MagicPistolBulletGraphicComponent extends GraphicComponent {
    public ctx: CanvasRenderingContext2D;
    public backgroundColor = "gray";
    public radius = 2;

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public update(bullet: MagicPistolBullet, params: CommandParms): void {
        if (!this.insideRenderLimits(bullet, params.game)) {
            return;
        }

        const relativePosition = bullet.getPosition().sub(params.game.camera.getCanvasLimits().minP);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.beginPath();
        this.ctx.arc(relativePosition.x, relativePosition.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    private insideRenderLimits(bullet: MagicPistolBullet, g: Game): boolean {
        const canvasLimits = g.camera.getCanvasLimits();
        const tPosition = bullet.getPosition();
        return tPosition.x >= canvasLimits.minP.x * 1.1
            && tPosition.y >= canvasLimits.minP.y * 1.1
            && tPosition.x <= canvasLimits.maxP.x * 1.1
            && tPosition.y <= canvasLimits.maxP.y * 1.1;
    }
}