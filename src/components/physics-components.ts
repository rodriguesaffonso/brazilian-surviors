import { GameObject, ObjectDirection, PhysicsComponentParams, Vector2D } from "../utils";
import { CommandParms, Component } from "./interfaces";

export abstract class PhysicsComponent implements Component  {
    public position: Vector2D;          // Position of the object
    public velocity: Vector2D;          // Current object velocity
    public direction: ObjectDirection;  // Current direction the object is facing
    public speed: number;

    private lastPosition: Vector2D;
    private lastUniquePosition: Vector2D;   // Last unique position kept to update the direction every update loop
    private lastDirection: ObjectDirection;

    constructor(params: PhysicsComponentParams) {
        this.position = params.position ?? new Vector2D(0, 0);
        this.velocity = params.velocity ?? new Vector2D(0, 0);
        this.speed = params.speed ?? 0;
        this.direction = params.direction ?? ObjectDirection.Right;
        this.lastUniquePosition = Vector2D.zero();
        this.lastPosition = this.position.copy();
        this.lastDirection = this.direction;
    }

    public update(obj: GameObject, params?: CommandParms): void {
        this.lastPosition = this.position.copy();
        this.move();
        
        if (!this.velocity.isZero()) {
            this.direction = this.newDirection(this.lastUniquePosition, this.position);
            this.lastUniquePosition = this.position;
        }
    }

    public isMoving(): boolean {
        return !this.lastPosition.equals(this.position);
    }

    private move(): void {
        this.position = this.position.add(this.velocity);
    }

    private newDirection(oldPosition: Vector2D, newPosition: Vector2D): ObjectDirection {
        this.lastDirection = this.direction;
        const directionVector = newPosition.sub(oldPosition);
        if (directionVector.x === 0) return this.lastDirection;
        return directionVector.x > 0 ? ObjectDirection.Right : ObjectDirection.Left;
    }
}
