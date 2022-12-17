import { PhysicsComponent } from "../../components";
import { Vector2D } from "../../interfaces";
import { Player } from "../player";

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
