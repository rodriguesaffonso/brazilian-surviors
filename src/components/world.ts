import { Camera } from "./camera";
import { AbstractObject, Vector2D } from "./interfaces";

const MAX_GRID_SIZE = 1e6;

export class World extends AbstractObject {
    public backGroundColor = "#201A23";
    public ctx: CanvasRenderingContext2D;
    public tileSize = 50;
    public camera: Camera;

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, t: number) {
        super(ctx, Vector2D.zero(), t);
        this.camera = camera;
    }

    public draw(): void {
        this.ctx.clearRect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
        this.ctx.fillStyle = this.backGroundColor;
        this.ctx.fillRect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
        this.drawTileGrid();
    }

    private drawTileGrid(): void {
        const { minP, maxP } = this.camera.getCanvasLimits();
        this.ctx.fillStyle = 'black';

        for (let i = minP.x; i < maxP.x; i++) {
            if (i % this.tileSize !== 0) continue;
            for (let j = minP.y; j < maxP.y; j++) {
                if (j % this.tileSize !== 0) continue;
                const canvasX = (i - minP.x) % this.camera.canvasWidth;
                const canvasY = (j - minP.y) % this.camera.canvasHeight;

                this.ctx.beginPath()
                this.ctx.arc(canvasX, canvasY, 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
}