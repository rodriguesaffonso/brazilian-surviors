
import { PhysicsComponent } from "../../components/physics-components";
import { Vector2D } from "../../interfaces";
import { Triangle } from "./triangle";

export class TrianglePhysicsComponent implements PhysicsComponent {
    public position: Vector2D;
    public velocity: Vector2D = Vector2D.zero();
    public speed: number = 1;

    public update(enemy: Triangle): void {
        if (!enemy.player) {
            return;
        }
        const vectorToPlayer = enemy.player.center.sub(enemy.center);
        if (vectorToPlayer.modulo() < this.speed) {
            return;
        }

        this.velocity = vectorToPlayer.unit().multiply(this.speed);
        enemy.center = enemy.center.add(this.velocity);
    }
}
