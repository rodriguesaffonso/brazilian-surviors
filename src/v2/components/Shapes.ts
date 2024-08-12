import { Vector2D } from "../../utils";

export abstract class Shape {
    public draw(ctx: CanvasRenderingContext2D): void {
        throw Error('NYI');
    }
}

export interface CircleShapeParams {
    center?: Vector2D;
    radius?: number;
    color?: string;
}

export class CircleShape extends Shape {
    private center: Vector2D;
    private radius: number;
    private color: string;
    constructor(params: CircleShapeParams) {
        super();
        this.center = params.center ?? Vector2D.zero();
        this.radius = params.radius ?? 10;
        this.color = params.color ?? 'white';
    }
    public getRadius(): number { return this.radius; }
    public getCenter(): Vector2D { return this.center; }
    public setCenter(center: Vector2D) { this.center = center; }
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}