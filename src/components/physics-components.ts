import { GameObject, Vector2D } from "../interfaces";
import { CommandParms } from "./params";

export enum ObjectDirection {
    Left = 0,
    Right = 1
}

export interface PhysicsComponentParams {
    position?: Vector2D;
    velocity?: Vector2D;
    speed?: number;
    direction?: ObjectDirection;
}

export abstract class PhysicsComponent {
    public position: Vector2D;          // Position of the object
    public velocity: Vector2D;          // Current object velocity
    public direction: ObjectDirection;  // Current direction the object is facing
    public speed: number;

    private lastUniquePosition: Vector2D;   // Last unique position kept to update the direction every update loop

    constructor(params: PhysicsComponentParams) {
        this.position = params.position ?? new Vector2D(0, 0);
        this.velocity = params.velocity ?? new Vector2D(0, 0);
        this.speed = params.speed ?? 0;
        this.direction = params.direction ?? ObjectDirection.Right;
        this.lastUniquePosition = Vector2D.zero();
    }

    public update(obj: GameObject, params?: CommandParms): void {
        this.move();
        
        if (!this.velocity.isZero()) {
            this.direction = this.newDirection(this.lastUniquePosition, this.position);
            this.lastUniquePosition = this.position;
        }
    }

    private move(): void {
        this.position = this.position.add(this.velocity);
    }

    private newDirection(oldPosition: Vector2D, newPosition: Vector2D): ObjectDirection {
        const directionVector = newPosition.sub(oldPosition);
        return directionVector.x >= 0 ? ObjectDirection.Right : ObjectDirection.Left;
    }
}
