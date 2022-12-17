import { InputComponent, PhysicsComponent } from "../../components";
import { AbstractObject, Vector2D } from "../../interfaces";


const CANVAS_SIZE = 800;

export class Camera extends AbstractObject {
    public readonly canvasWidth = CANVAS_SIZE;
    public readonly canvasHeight = CANVAS_SIZE;
    
    public inputComponent: InputComponent; // Player input component
    public physicsComponent: PhysicsComponent; // Player physics component

    constructor(ctx: CanvasRenderingContext2D, t: number, input: InputComponent, physics: PhysicsComponent) {
        super(ctx, new Vector2D(CANVAS_SIZE / 2, CANVAS_SIZE / 2), t);
        
        this.inputComponent = input;
        this.physicsComponent = physics;

        input.start();
    }

    public getCanvasLimits(): { minP: Vector2D, maxP: Vector2D } {
        return { 
            minP: new Vector2D(Math.floor(this.center.x - this.canvasWidth / 2), Math.floor(this.center.y - this.canvasHeight / 2)),
            maxP: new Vector2D(Math.floor(this.center.x + this.canvasWidth / 2), Math.floor(this.center.y + this.canvasHeight / 2)),
        }
    }

    public update(): void {
        this.inputComponent.update(this);
        this.physicsComponent.update(this);
    }
}