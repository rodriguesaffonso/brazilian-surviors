import { GraphicComponent } from "../../components/graphic-components";
import { ObjectDirection } from "../../utils";
import { Player } from "./player";

export class PlayerGraphicComponent extends GraphicComponent {
    public width = 10;
    public height = 10;

    public backgroundColor = "#8DAA9D";

    public visorColor = "red";
    public visorRadius = 2;

    public healthBarHeight = 3;
    public healthBarWidth = 25;
    public healthBarColor = "red";

    
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

        // Draw health bar
        const filledBarSize = this.healthBarWidth * player.combatComponent.hp / player.combatComponent.maxHp;
        const barX = relativePosition.x - this.healthBarWidth / 2;
        const barY = relativePosition.y + this.height;
        if (filledBarSize < this.healthBarWidth) {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(barX, barY, this.healthBarWidth, this.healthBarHeight);
        }
        this.ctx.fillStyle = this.healthBarColor;
        this.ctx.fillRect(barX, barY, filledBarSize, this.healthBarHeight);

    }

    private visorXOffset(plyer: Player): number {
        return plyer.physicsComponent.direction === ObjectDirection.Right
            ? 2
            : -2;
    }
}
