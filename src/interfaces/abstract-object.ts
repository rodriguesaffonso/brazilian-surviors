import { GameObject } from "./game-object";
import { Vector2D } from "./vector2D";

export class AbstractObject extends GameObject {
    public readonly createdTime: number;
    public ctx: CanvasRenderingContext2D;
    public center: Vector2D;

    public dead: boolean = false;
    public maxHp: number = 100;
    public hp: number = 100;
    public damage: number = 10;

    public speed: number = 2;
    public velocity: Vector2D = new Vector2D(0, 0);
    public weapons: AbstractObject[] = [];

    public readonly onKilledCbs: (() => void)[] = [];

    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, timestamp: number) {
        super({});
        this.createdTime = timestamp;
        this.ctx = ctx;
        this.center = center.copy();
    }

    public draw(): void { throw Error('Should implement draw'); }
    public canAttack(obj: AbstractObject): boolean { throw Error('Should implement canAttack'); }
    public attack(obj: AbstractObject): boolean {
        if (!obj.isAlive() || !this.canAttack(obj)) {
            return false;
        }
        obj.takeHit(this.damage);
        this.weapons.forEach(w => w.attack(obj));
        return true;
    }
    public hit(obj: AbstractObject): void { throw Error('Should implement hit by object'); }
    public move(): void {
        this.beforeMove();
        this.center = this.center.add(this.velocity);
        this.weapons.forEach(w => w.move());
    }
    public beforeMove(): void { }

    public takeHit(damage: number): void {
        if (this.dead) { return; }
        this.hp -= damage
        if (this.hp < 0) {
            this.hp = 0;
            this.dead = true;
            this.onKilled();
        }
    }

    public onKilled(): void {
        this.onKilledCbs.forEach(cb => cb());
    }

    public addOnKilledCallback(cb: () => void): void {
        this.onKilledCbs.push(cb);
    }

    public isAlive(): boolean { return !this.dead; }

    public translate(v: Vector2D): void {
        this.center = this.center.add(v);
        this.weapons.forEach(w => w.translate(v));
    }

    public update(): void {
        throw Error(`Should implement update`);
    }
}
