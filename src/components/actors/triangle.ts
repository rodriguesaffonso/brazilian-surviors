import { Camera } from "../camera";
import { AbstractObject, Vector2D } from "../interfaces";
import { Player } from "./player";

export class Triangle extends AbstractObject {
    public ctx: CanvasRenderingContext2D;
    public player: Player;
    public camera: Camera;
    
    public edgeLength: number = 10;
    public backgroundColor: string = "#8DAA9D";

    public maxHp = 10;
    public hp = 10;
    public damage = 8;
    public speed = 1;

    public distToAttack = 10;

    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, player: Player, camera: Camera, t: number) {
        super(ctx, center, t);
        this.ctx = ctx;
        this.player = player;
        this.camera = camera;
    }

    public draw(): void {
        this.ctx.fillStyle = this.backgroundColor;
        const sqrt3 = Math.sqrt(3);
        const relativePosition = this.center.sub(this.camera.getCanvasLimits().minP);
        this.ctx.beginPath();
        this.ctx.moveTo(relativePosition.x - this.edgeLength / 6, relativePosition.y - this.edgeLength * sqrt3 / 6);
        this.ctx.lineTo(relativePosition.x + this.edgeLength * 5 / 6, relativePosition.y - this.edgeLength * sqrt3 / 6);
        this.ctx.lineTo(relativePosition.x + this.edgeLength / 3, relativePosition.y + this.edgeLength * sqrt3 / 3);
        this.ctx.fill();
    }

    public beforeMove(): void {
        const vectorToPlayer = this.getVectorToP(this.player.center);
        if (vectorToPlayer.modulo() < this.speed) {
            return;
        }

        this.velocity = vectorToPlayer.unit().multiply(this.speed);
    }

    public canAttack(player: Player): boolean {
        return this.getVectorToP(player.center).modulo() < this.distToAttack;
    }

    public getVectorToP(p: Vector2D): Vector2D {
        return p.sub(this.center);
    }
}