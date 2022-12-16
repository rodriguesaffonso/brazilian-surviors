import { InputComponent } from "../input-components";
import { PhysicsComponent } from "../physics-components";

export abstract class GameObject {
    public inputComponent: InputComponent;
    public physicsComponent: PhysicsComponent;

    constructor(
        input: InputComponent,
        physics: PhysicsComponent
    ) {
        this.inputComponent = input;
        this.physicsComponent = physics;
    }

    public update(): void {
        this.inputComponent?.update();
        this.physicsComponent?.update();
    }
}