import { ObjectDirection } from "../../components";
import { GraphicComponent } from "../../components/graphic-components";
import { Player } from "./player";

export class PlayerGraphicComponent extends GraphicComponent {
    public width = 10;
    public height = 10;

    public backgroundColor = "#8DAA9D";

    public visorColor = "red";
    public visorRadius = 2;

    public hpLabelColor = "white";
    
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public update(player: Player): void {
        const relativePosition = player.getPosition().sub(player.camera.getCanvasLimits().minP);

        // Draw base square
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(relativePosition.x - this.width / 2, relativePosition.y - this.height / 2, this.width, this.height);

        // Draw visor direction dot
        this.ctx.fillStyle = this.visorColor;
        const visorXOffset = this.visorXOffset(player);
        this.ctx.beginPath();
        this.ctx.arc(relativePosition.x + visorXOffset, relativePosition.y, this.visorRadius, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw hp bar status
        this.ctx.fillStyle = this.hpLabelColor;
        this.ctx.font = "24px serif";
        this.ctx.fillText(`HP: ${player.combatComponent.hp} / ${player.combatComponent.maxHp}`, 10, 30);
    }

    private visorXOffset(plyer: Player): number {
        return plyer.physicsComponent.direction === ObjectDirection.Right
            ? 2
            : -2;
    }
}
