import { PhysicsComponent } from "../../components";
import { Vector2D } from "../../interfaces";
import { Bullet } from "./bullet";

export class BulletPhysicsComponent implements PhysicsComponent {
    public speed: number = 3;
    public velocity: Vector2D = Vector2D.zero();
    public position: Vector2D = Vector2D.zero();

    public update(bullet: Bullet): void {
        if (bullet.enemy) {                       
            const vectorToEnemy = bullet.enemy.getPosition().sub(bullet.getPosition());
            this.velocity = vectorToEnemy.unit().multiply(this.speed);
            this.move();
        }
    }
    
    private move(): void {
        this.position = this.position.add(this.velocity);
    }
}