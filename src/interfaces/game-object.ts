
import { ActionComponent } from "../components/action-components";
import { GraphicComponent } from "../components/graphic-components";
import { InputComponent } from "../components/input-components";
import { PhysicsComponent } from "../components/physics-components";

export interface ObjectComponents {
    input?: InputComponent;
    action?: ActionComponent;
    physics?: PhysicsComponent;
    graphic?: GraphicComponent;
}

export abstract class GameObject {
    public inputComponent: InputComponent;
    public actionComponent: ActionComponent;
    public physicsComponent: PhysicsComponent;
    public graphicComponent: GraphicComponent;

    constructor(components: ObjectComponents) {
        this.inputComponent = components.input;
        this.actionComponent = components.action;
        this.physicsComponent = components.physics;
        this.graphicComponent = components.graphic;
    }

    public update(): void {
        this.inputComponent?.update(this);
        this.actionComponent?.update(this);
        this.physicsComponent?.update(this);
        this.graphicComponent?.update(this);
    }
}