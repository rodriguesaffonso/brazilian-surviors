import { CommandParms } from "../../components";
import { GraphicComponent } from "../../components/graphic-components";
import { ObjectDirection, Vector2D } from "../../utils";
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

    private avatarImg;
    private avatarImgTotalFrames: number;
    private avatarImgElapsedTime: number;
    private avatarImgFrameTime: number;
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
        this.avatarImg = new Image();
        this.avatarImg.src = "./img/Player-Avatar.png";
        this.avatarImgTotalFrames = 4;
        this.avatarImgElapsedTime = 0;
        this.avatarImgFrameTime = 200;
    }

    public update(player: Player, params: CommandParms): void {
        const relativePosition = player.getPosition().sub(player.camera.getCanvasLimits().minP);

        this.drawImageAvatar(player, relativePosition, params.elapsedMs);
        this.drawHealthBar(player, relativePosition);
    }

    private drawImageAvatar(player: Player, relativePosition: Vector2D, elapsedMs: number): void {
        if (!player.isMoving()) {
            this.avatarImgElapsedTime = (this.avatarImgTotalFrames - 1) * this.avatarImgFrameTime; // last frame
        } else {
            this.avatarImgElapsedTime += elapsedMs;
            this.avatarImgElapsedTime %= this.avatarImgTotalFrames * this.avatarImgFrameTime;
        }
        
        const imgSize = 30;
        const flip = player.physicsComponent.direction === ObjectDirection.Right ? 1 : -1;
        const frameSize = this.avatarImg.width / this.avatarImgTotalFrames;
        const imgOffset = Math.floor(this.avatarImgElapsedTime / this.avatarImgFrameTime) * frameSize;

        this.ctx.save();
        this.ctx.scale(flip, 1);
        this.ctx.drawImage(
            this.avatarImg,
            imgOffset,
            0,
            frameSize,
            this.avatarImg.height,
            flip * relativePosition.x - imgSize / 2, 
            relativePosition.y - imgSize / 2 - 10, 
            imgSize, 
            imgSize
        );
        this.ctx.restore();
    }

    private drawHealthBar(player: Player, relativePosition: Vector2D): void {
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
}
