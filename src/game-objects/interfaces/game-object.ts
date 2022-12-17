
import { InputComponent } from "../../components/input-components";
import { PhysicsComponent } from "../../components/physics-components";

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