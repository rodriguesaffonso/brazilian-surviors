import { GameObject, Vector2D } from "../interfaces";
import { CommandParms } from "./params";

export interface PhysicsComponentParams {
    position?: Vector2D;
    velocity?: Vector2D;
    speed?: number;
}

export abstract class PhysicsComponent {
    public position: Vector2D;
    public velocity: Vector2D;
    public speed: number;

    constructor(params: PhysicsComponentParams) {
        this.position = params.position ?? new Vector2D(0, 0);
        this.velocity = params.velocity ?? new Vector2D(0, 0);
        this.speed = params.speed ?? 0;
    }

    public update(obj: GameObject, params?: CommandParms): void {
        this.move();
    }

    private move(): void {
        this.position = this.position.add(this.velocity);
    }
}
