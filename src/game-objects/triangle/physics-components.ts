
import { CommandParms } from "../../components";
import { PhysicsComponent } from "../../components/physics-components";
import { Vector2D } from "../../interfaces";
import { Triangle } from "./triangle";

export class TrianglePhysicsComponent extends PhysicsComponent {
    constructor(position: Vector2D) {
        super({ position, speed: 1 });
    }

    public update(enemy: Triangle, params: CommandParms): void {
        if (!enemy.player) {
            return;
        }
        const vectorToPlayer = enemy.player.getPosition().sub(enemy.getPosition());
        if (vectorToPlayer.modulo() < this.speed) {
            return;
        }

        this.velocity = vectorToPlayer.unit().multiply(this.speed);
        super.update(enemy, params);
    }
}
