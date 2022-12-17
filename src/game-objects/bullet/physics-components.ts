import { PhysicsComponent } from "../../components/physics-components";
import { Vector2D } from "../interfaces";
import { Bullet } from "./bullet";

export class BulletPhysicsComponent implements PhysicsComponent {
    public speed: number = 3;
    public velocity: Vector2D = Vector2D.zero();
    public position: Vector2D;

    update(bullet: Bullet): void {
        if (bullet.enemy) {                       
            const vectorToEnemy = bullet.enemy.center.sub(bullet.center); // TODO: move center to physics component as position
            this.velocity = vectorToEnemy.unit().multiply(this.speed);
            bullet.center = bullet.center.add(this.velocity);
        }
    }
}