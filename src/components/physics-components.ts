import { Player } from "./actors";
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