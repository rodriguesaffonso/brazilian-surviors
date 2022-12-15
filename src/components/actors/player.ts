import { Camera } from "../camera";
import { AbstractObject } from "../interfaces";

export class Player extends AbstractObject {
    public width = 10;
    public height = 10;
    public backgroundColor = "#8DAA9D";
    public ctx: CanvasRenderingContext2D;
    public camera: Camera;

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, t: number) {
        super(ctx, camera.center, t)
        this.camera = camera;

        this.maxHp = 100;
        this.hp = 100;
        this.damage = 0;
        this.speed = 2;
    }

    public draw(): void {
        this.weapons.forEach(w => w.draw());
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.center.x - this.width / 2, this.center.y - this.height / 2, this.width, this.height);

        this.ctx.font = "24px serif";
        this.ctx.fillText(`HP: ${this.hp} / ${this.maxHp}`, 10, 30);
    }

    public canAttack(enemy: AbstractObject): boolean {
        return this.weapons.length > 0;
    }

    public addWeapon(w: AbstractObject): void {
        this.weapons.push(w);
    }
}