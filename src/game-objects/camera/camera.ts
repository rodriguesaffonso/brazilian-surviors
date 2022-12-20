import { InputComponent, PhysicsComponent } from "../../components";
import { GameObject, GameObjectKind, ObjectComponents, Vector2D } from "../../interfaces";

const CANVAS_SIZE = 800;

export class Camera extends GameObject {
    public readonly canvasWidth = CANVAS_SIZE;
    public readonly canvasHeight = CANVAS_SIZE;
    
    constructor(components: ObjectComponents) {
        super({ 
            input: components.input,
            physics: components.physics,
        }, GameObjectKind.Camera);
    }

    public getCanvasLimits(): { minP: Vector2D, maxP: Vector2D } {
        return {
            minP: new Vector2D(Math.floor(this.getPosition().x - this.canvasWidth / 2), Math.floor(this.getPosition().y - this.canvasHeight / 2)),
            maxP: new Vector2D(Math.floor(this.getPosition().x + this.canvasWidth / 2), Math.floor(this.getPosition().y + this.canvasHeight / 2)),
        }
    }
}