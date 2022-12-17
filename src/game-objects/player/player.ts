import { Camera } from "../camera/camera";
import { GraphicComponent } from "../../components/graphic-components";
import { AbstractObject } from "../interfaces";
import { PhysicsComponent } from "../../components/physics-components";
import { InputComponent } from "../../components/input-components";

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