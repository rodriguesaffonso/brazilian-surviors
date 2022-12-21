import { GraphicComponent } from "../../components/graphic-components";
import { Triangle } from "./triangle";


export class TriangleGraphicComponent extends GraphicComponent {
    public edgeLength: number = 10;
    public backgroundColor: string = "#8DAA9D";

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public update(obj: Triangle): void {
        this.ctx.fillStyle = this.backgroundColor;
        const sqrt3 = Math.sqrt(3);
        const relativePosition = obj.getPosition().sub(obj.camera.getCanvasLimits().minP);
        this.ctx.beginPath();
        this.ctx.moveTo(relativePosition.x - this.edgeLength / 6, relativePosition.y - this.edgeLength * sqrt3 / 6);
        this.ctx.lineTo(relativePosition.x + this.edgeLength * 5 / 6, relativePosition.y - this.edgeLength * sqrt3 / 6);
        this.ctx.lineTo(relativePosition.x + this.edgeLength / 3, relativePosition.y + this.edgeLength * sqrt3 / 3);
        this.ctx.fill();
    }
}
