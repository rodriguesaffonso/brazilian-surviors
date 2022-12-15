import { AbstractObject, Vector2D } from "../interfaces";
import { World } from "../world";

export class Player extends AbstractObject {
    public width = 10;
    public height = 10;
    public backgroundColor = "#8DAA9D";
    public ctx: any;
    public map: World;

    constructor(ctx: any, map: World, t: number) {
        super(map.center, t)
        this.ctx = ctx;
        this.map = map;

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