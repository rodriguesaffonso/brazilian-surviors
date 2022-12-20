
import { PhysicsComponent } from "../../components/physics-components";
import { Vector2D } from "../../interfaces";
import { Triangle } from "./triangle";

export class TrianglePhysicsComponent implements PhysicsComponent {
    public position: Vector2D;
    public velocity: Vector2D = Vector2D.zero();
    public speed: number = 1;

    constructor(position: Vector2D) {
        this.position = position ?? Vector2D.zero();
    }

    public update(enemy: Triangle): void {
        if (!enemy.player) {
            return;
        }
        const vectorToPlayer = enemy.player.physicsComponent.position.sub(enemy.physicsComponent.position);
        if (vectorToPlayer.modulo() < this.speed) {
            return;
        }

        this.velocity = vectorToPlayer.unit().multiply(this.speed);
        enemy.physicsComponent.position = enemy.physicsComponent.position.add(this.velocity);
    }
}
