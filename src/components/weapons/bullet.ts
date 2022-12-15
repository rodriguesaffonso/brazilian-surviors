import { AbstractObject, Vector2D } from "../interfaces";

export class Bullet extends AbstractObject {
    public ctx: any;
    public enemy: AbstractObject;

    public backgroundColor = "white";
    public radius = 2;

    public speed = 2;
    public damage = 20;
    public distToAttack = 50;

    public travelling = false;

    constructor(ctx: any, center: Vector2D, t: number) {
        super(center, t);
        this.ctx = ctx;
    }

    public beforeMove(): void {
        if (this.enemy) {
            const vectorToEnemy = this.vectorToEnemy();
            this.velocity = vectorToEnemy.unit().multiply(this.speed);
        }
    }

    public canAttack(enemy: AbstractObject): boolean {
        if (this.enemy !== enemy) {
            return false;
        }
        return this.vectorToEnemy().modulo() < (2 * this.radius);
    }

    public draw(): void {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.beginPath()
        this.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        this.ctx.fill();
    }

    public vectorToEnemy(): Vector2D {
        return this.enemy.center.sub(this.center);
    }

    public trackEnemy(enemy: AbstractObject): void {
        this.enemy = enemy;
        this.travelling = true;
        enemy.addOnKilledCallback(this.onEnemyKilled.bind(this));
    }

    public onEnemyKilled(): void {
        this.enemy = undefined;
    }
}