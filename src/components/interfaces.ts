export class Vector2D {
    public readonly x: number;
    public readonly y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public static zero(): Vector2D {
        return new Vector2D(0, 0);
    }
    public modulo(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    public copy(): Vector2D {
        return new Vector2D(this.x, this.y);
    }
    public multiply(k: number): Vector2D {
        return new Vector2D(k * this.x, k * this.y);
    }
    public unit(): Vector2D {
        if (this.x === 0 && this.y === 0) {
            return Vector2D.zero();
        }
        return this.multiply(1 / this.modulo());
    }
    public add(v: Vector2D): Vector2D {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }
    public sub(v: Vector2D): Vector2D {
        return this.add(v.multiply(-1));
    }
}

export class AbstractObject {
    public readonly createdTime: number;
    public center: Vector2D;

    public dead: boolean = false;
    public maxHp: number = 100;
    public hp: number = 100;
    public damage: number = 10;

    public speed: number = 2;
    public velocity: Vector2D = new Vector2D(0, 0);
    public weapons: AbstractObject[] = [];

    public readonly onKilledCbs: (() => void)[] = [];

    constructor(center: Vector2D, timestamp: number) {
        this.createdTime = timestamp;
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
}
