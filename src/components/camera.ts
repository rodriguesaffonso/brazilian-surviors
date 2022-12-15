import { AbstractObject, Vector2D } from "./interfaces";

const CANVAS_SIZE = 800;

export class Camera extends AbstractObject {
    public readonly canvasWidth = CANVAS_SIZE;
    public readonly canvasHeight = CANVAS_SIZE;

    constructor(ctx: CanvasRenderingContext2D, t: number) {
        super(ctx, new Vector2D(CANVAS_SIZE / 2, CANVAS_SIZE / 2), t);
        console.log(this.center);
    }

    public getCanvasLimits(): { minX: number; maxX: number; minY: number; maxY: number } {
        return {
            minX: this.center.x - this.canvasWidth / 2,
            maxX: this.center.x + this.canvasWidth / 2,
            minY: this.center.y - this.canvasHeight / 2,
            maxY: this.center.y + this.canvasHeight / 2
        }
    }
}