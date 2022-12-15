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