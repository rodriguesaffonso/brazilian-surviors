import { Player, Triangle } from "./actors";
import { Camera } from "./camera";
import { AbstractObject, Vector2D } from "./interfaces";

export interface GraphicComponent {
    update(obj?: AbstractObject): void;
}

export class PlayerGraphicComponent implements GraphicComponent {
    public width = 10;
    public height = 10;
    public backgroundColor = "#8DAA9D";
    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public update(player: Player): void {
        player.weapons.forEach(w => w.move()); // TODO: add bullet components
        player.weapons.forEach(w => w.draw()); // TODO: add bullet components
        
        const relativePosition = player.center.sub(player.camera.getCanvasLimits().minP);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(relativePosition.x - this.width / 2, relativePosition.y - this.height / 2, this.width, this.height);

        this.ctx.font = "24px serif";
        this.ctx.fillText(`HP: ${player.hp} / ${player.maxHp}`, 10, 30);
    }
}

export class WorldGraphicComponent implements GraphicComponent {
    public ctx: CanvasRenderingContext2D;
    public camera: Camera;
    public backGroundColor = "#201A23";
    public tileSize = 50;
    
    constructor(ctx: CanvasRenderingContext2D, camera: Camera) {
        this.ctx = ctx;
        this.camera = camera;
    }

    public update(): void {
        this.draw();
    }

    private draw(): void {
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

export class TriangleGraphicComponent implements GraphicComponent {
    public edgeLength: number = 10;
    public backgroundColor: string = "#8DAA9D";

    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public update(obj: Triangle): void {
        this.ctx.fillStyle = this.backgroundColor;
        const sqrt3 = Math.sqrt(3);
        const relativePosition = obj.center.sub(obj.camera.getCanvasLimits().minP);
        this.ctx.beginPath();
        this.ctx.moveTo(relativePosition.x - this.edgeLength / 6, relativePosition.y - this.edgeLength * sqrt3 / 6);
        this.ctx.lineTo(relativePosition.x + this.edgeLength * 5 / 6, relativePosition.y - this.edgeLength * sqrt3 / 6);
        this.ctx.lineTo(relativePosition.x + this.edgeLength / 3, relativePosition.y + this.edgeLength * sqrt3 / 3);
        this.ctx.fill();
    }
}