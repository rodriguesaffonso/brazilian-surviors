import { InputComponent, PhysicsComponent } from "../../components";
import { GameObject, GameObjectKind, Vector2D } from "../../interfaces";

const CANVAS_SIZE = 800;

export class Camera extends GameObject {
    public readonly canvasWidth = CANVAS_SIZE;
    public readonly canvasHeight = CANVAS_SIZE;
    
    constructor(ctx: CanvasRenderingContext2D, t: number, input: InputComponent, physics: PhysicsComponent) {
        super({ input, physics }, GameObjectKind.Camera);
        input.start();
    }

    public update(): void {
        this.inputComponent.update(this);
        this.physicsComponent.update(this);
    }

    public getCanvasLimits(): { minP: Vector2D, maxP: Vector2D } {
        return { 
            minP: new Vector2D(Math.floor(this.physicsComponent.position.x - this.canvasWidth / 2), Math.floor(this.physicsComponent.position.y - this.canvasHeight / 2)),
            maxP: new Vector2D(Math.floor(this.physicsComponent.position.x + this.canvasWidth / 2), Math.floor(this.physicsComponent.position.y + this.canvasHeight / 2)),
        }
    }
}