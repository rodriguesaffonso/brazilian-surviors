import { GraphicComponent } from "../../components/graphic-components";
import { Player } from "./player";

export class PlayerGraphicComponent extends GraphicComponent {
    public width = 10;
    public height = 10;
    public backgroundColor = "#8DAA9D";
    
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public update(player: Player): void {
        const relativePosition = player.getPosition().sub(player.camera.getCanvasLimits().minP);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(relativePosition.x - this.width / 2, relativePosition.y - this.height / 2, this.width, this.height);

        this.ctx.font = "24px serif";
        this.ctx.fillText(`HP: ${player.combatComponent.hp} / ${player.combatComponent.maxHp}`, 10, 30);
    }
}
