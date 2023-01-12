import { GameObject, GameObjectKind, getCanvasSize, ObjectComponents, Vector2D } from "../../utils";
import { PlayerInputComponent, PlayerPhysicsComponent } from "../player";

export interface CanvasLimits {
    minP: Vector2D;
    maxP: Vector2D;
    farMinP: Vector2D;
    farMaxP: Vector2D;
}

export class Camera extends GameObject {
    public readonly canvasWidth;
    public readonly canvasHeight;

    constructor(components: ObjectComponents) {
        super({
            input: components.input,
            physics: components.physics,
        }, GameObjectKind.Camera);

        const ws = getCanvasSize();
        this.canvasWidth = ws.width;
        this.canvasHeight = ws.height;
    }

    public getCanvasLimits(): CanvasLimits {
        return {
            minP: new Vector2D(Math.floor(this.getPosition().x - this.canvasWidth / 2), Math.floor(this.getPosition().y - this.canvasHeight / 2)),
            maxP: new Vector2D(Math.floor(this.getPosition().x + this.canvasWidth / 2), Math.floor(this.getPosition().y + this.canvasHeight / 2)),
            farMinP: new Vector2D(Math.floor(this.getPosition().x - this.canvasWidth * 1.1 / 2), Math.floor(this.getPosition().y - this.canvasHeight * 1.1 / 2)),
            farMaxP: new Vector2D(Math.floor(this.getPosition().x + this.canvasWidth * 1.1 / 2), Math.floor(this.getPosition().y + this.canvasHeight * 1.1 / 2)),
        }
    }
}

export function createCamera(): Camera {
    const physicsComponent = new PlayerPhysicsComponent();
    return new Camera({
        input: new PlayerInputComponent(physicsComponent),
        physics: physicsComponent
    });
}