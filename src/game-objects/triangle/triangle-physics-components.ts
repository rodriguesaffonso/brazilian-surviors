
import { CommandParms } from "../../components";
import { PhysicsComponent } from "../../components/physics-components";
import { PhysicsComponentParams, Vector2D } from "../../utils";
import { Triangle } from "./triangle";

export class TrianglePhysicsComponent extends PhysicsComponent {
    constructor(params: PhysicsComponentParams) {
        super({ 
            position: params.position, 
            speed: params.speed ?? 0.8
        });
    }

    public update(enemy: Triangle, params: CommandParms): void {
        const vectorToPlayer = enemy.player.getPosition().sub(enemy.getPosition());
        if (vectorToPlayer.modulo() < this.speed) {
            return;
        }

        this.velocity = vectorToPlayer.unit().multiply(this.speed);
        super.update(enemy, params);
    }
}
