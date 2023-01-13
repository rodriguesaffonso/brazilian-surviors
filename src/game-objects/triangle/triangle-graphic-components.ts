import { GraphicComponent } from "../../components/graphic-components";
import { Vector2D } from "../../utils";
import { Triangle } from "./triangle";


export class TriangleGraphicComponent extends GraphicComponent {
    public edgeLength: number = 10;
    public backgroundColor: string = "#8DAA9D";

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public update(triangle: Triangle): void {
        if (!this.insideRenderLimits(triangle)) {
            return;
        }

        const sqrt3 = Math.sqrt(3);
        const relativePosition = triangle.getPosition().sub(triangle.camera.getCanvasLimits().minP);
        
        const p1 = new Vector2D(relativePosition.x - this.edgeLength / 6, relativePosition.y - this.edgeLength * sqrt3 / 6);
        const p2 = new Vector2D(relativePosition.x + this.edgeLength * 5 / 6, relativePosition.y - this.edgeLength * sqrt3 / 6);
        const p3 = new Vector2D(relativePosition.x + this.edgeLength / 3, relativePosition.y + this.edgeLength * sqrt3 / 3);

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.fill();

        this.ctx.strokeStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.stroke();
    }

    private insideRenderLimits(triangle: Triangle): boolean {
        const canvasLimits = triangle.camera.getCanvasLimits();
        const tPosition = triangle.getPosition();
        return tPosition.x >= canvasLimits.minP.x
            && tPosition.y >= canvasLimits.minP.y
            && tPosition.x <= canvasLimits.maxP.x
            && tPosition.y <= canvasLimits.maxP.y;
    }
}
