import { Camera } from "../camera";
import { AbstractObject, Vector2D } from "../interfaces";

export class Bullet extends AbstractObject {
    public ctx: CanvasRenderingContext2D;
    public enemy: AbstractObject;
    public camera: Camera;

    public backgroundColor = "white";
    public radius = 2;

    public speed = 3;
    public damage = 20;
    public distToAttack = 50;

    public travelling = false;

    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, camera: Camera, t: number) {
        super(ctx, center, t);
        this.camera = camera;
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
        const relativePosition = this.center.sub(this.camera.getCanvasLimits().minP);
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.beginPath()
        this.ctx.arc(relativePosition.x, relativePosition.y, this.radius, 0, Math.PI * 2)
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