import { PhysicsComponent } from "../../components";
import { Vector2D } from "../../interfaces";
import { Bullet } from "./bullet";

export class BulletPhysicsComponent implements PhysicsComponent {
    public speed: number = 3;
    public velocity: Vector2D = Vector2D.zero();
    public position: Vector2D = Vector2D.zero();

    update(bullet: Bullet): void {
        if (bullet.enemy) {                       
            const vectorToEnemy = bullet.enemy.physicsComponent.position.sub(bullet.physicsComponent.position); // TODO: move center to physics component as position
            this.velocity = vectorToEnemy.unit().multiply(this.speed);
            bullet.physicsComponent.position = bullet.physicsComponent.position.add(this.velocity);
        }
    }
}