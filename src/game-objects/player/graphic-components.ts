import { GraphicComponent } from "../../components/graphic-components";
import { Player } from "./player";

export class PlayerGraphicComponent implements GraphicComponent {
    public width = 10;
    public height = 10;
    public backgroundColor = "#8DAA9D";
    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public update(player: Player): void {
        const relativePosition = player.center.sub(player.camera.getCanvasLimits().minP);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(relativePosition.x - this.width / 2, relativePosition.y - this.height / 2, this.width, this.height);

        this.ctx.font = "24px serif";
        this.ctx.fillText(`HP: ${player.hp} / ${player.maxHp}`, 10, 30);
    }
}
