import { Player, Triangle } from "./actors";
import { AbstractObject, Vector2D } from "./interfaces";

export interface PhysicsComponent {
    update(obj?: AbstractObject): void;
}

export class PlayerPhysicsComponent implements PhysicsComponent {
    public position: Vector2D;
    public velocity: Vector2D = Vector2D.zero();
    public speed: number = 2;

    public update(player: Player): void {
        player.center = player.center.add(this.velocity);
    }

    public setVelocityDirection(direction: Vector2D): void {
        this.velocity = direction.unit().multiply(this.speed);
    }
}

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