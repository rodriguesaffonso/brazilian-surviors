import { GraphicComponent, InputComponent, PhysicsComponent } from "../../components";
import { AbstractObject } from "../../interfaces";
import { Camera } from "../camera";


export class Player extends AbstractObject {
    public camera: Camera;
    public inputComponent: InputComponent;
    public physicsComponent: PhysicsComponent;
    public graphicComponent: GraphicComponent;

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, t: number, input: InputComponent, physics: PhysicsComponent, graphic: GraphicComponent) {
        super(ctx, camera.center, t);
        this.camera = camera;

        this.maxHp = 100;
        this.hp = 100;
        this.damage = 0;

        this.inputComponent = input;
        this.physicsComponent = physics;
        this.graphicComponent = graphic;

        input.start();
    }

    public addWeapon(w: AbstractObject): Player {
        this.weapons.push(w);
        return this;
    }

    public update(): void {
        this.inputComponent.update(this);
        this.physicsComponent.update(this);
        this.graphicComponent.update(this);
    }
}