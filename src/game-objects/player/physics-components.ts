import { PhysicsComponent } from "../../components";
import { Vector2D } from "../../interfaces";
import { Player } from "../player";

export class PlayerPhysicsComponent extends PhysicsComponent {
    constructor() {
        super({ speed: 2 });
    }

    public setVelocityDirection(direction: Vector2D): void {
        this.velocity = direction.unit().multiply(this.speed);
    }
}
