import { PhysicsComponent } from "../../../components";
import { PhysicsComponentParams, Vector2D } from "../../../utils";

export class MagicPistolBulletPhysicsComponent extends PhysicsComponent {
    constructor(params: PhysicsComponentParams) { 
        super({ 
            speed: params.speed ?? 3,
            position: params.position
        });

        this.velocity = Vector2D.zero();
    }
}