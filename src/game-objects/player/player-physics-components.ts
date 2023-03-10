import { CommandParms, PhysicsComponent } from "../../components";
import { GameObject, Vector2D } from "../../utils";

export class PlayerPhysicsComponent extends PhysicsComponent {
    constructor() {
        super({ speed: 1.2 });
    }

    public setVelocityDirection(direction: Vector2D): void {
        this.velocity = direction.unit().multiply(this.speed);
    }
}
