import { AbstractObject, Vector2D } from "../interfaces";
import { Bullet } from "./bullet";

export class Gun extends AbstractObject {
    public ctx: CanvasRenderingContext2D
    public weapons: Bullet[];
    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, t: number) {
        super(ctx, center, t);

        this.speed = 0;
        this.damage = 0;
        this.weapons = [new Bullet(ctx, center, t)];
    }

    public canAttack(enemy: AbstractObject): boolean {
        if (this.weapons.length === 0) {
            return false;
        }
        
        for (const bullet of this.weapons) {
            if (bullet.enemy === undefined) {
                bullet.trackEnemy(enemy);
                return true;
            }

            if (bullet.enemy === enemy) {
                return true;
            }
        }
        return true;
    }

    public draw(): void {
        this.weapons.forEach(w => w.draw());
    }
}