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
