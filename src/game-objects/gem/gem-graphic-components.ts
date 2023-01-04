import { CommandParms } from "../../components";
import { GraphicComponent } from "../../components/graphic-components";
import { Camera } from "../camera";
import { Gem } from "./gem";


export class GemGraphicComponent extends GraphicComponent {
    public size: number = 7;
    public backgroundColor: string = "white";

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public update(gem: Gem, params: CommandParms): void {
        if (!this.insideRenderLimits(gem, params.game.camera)) {
            return;
        }

        const relativePosition = gem.getPosition().sub(params.game.camera.getCanvasLimits().minP);
        
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.beginPath();
        this.ctx.moveTo(relativePosition.x - this.size / 2, relativePosition.y);
        this.ctx.lineTo(relativePosition.x                , relativePosition.y - this.size / 2);
        this.ctx.lineTo(relativePosition.x + this.size / 2, relativePosition.y);
        this.ctx.lineTo(relativePosition.x                , relativePosition.y + this.size / 2);
        this.ctx.fill();
    }

    private insideRenderLimits(gem: Gem, camera: Camera): boolean {
        const canvasLimits = camera.getCanvasLimits();
        const tPosition = gem.getPosition();
        return tPosition.x >= canvasLimits.minP.x
            && tPosition.y >= canvasLimits.minP.y
            && tPosition.x <= canvasLimits.maxP.x
            && tPosition.y <= canvasLimits.maxP.y;
    }
}
