import { CommandParms, PhysicsComponent } from "../../components";
import { PhysicsComponentParams, Vector2D } from "../../interfaces";
import { Bullet } from "./bullet";

export class BulletPhysicsComponent extends PhysicsComponent {
    constructor(params: PhysicsComponentParams) { 
        super({ 
            speed: params.speed ?? 3,
            position: params.position 
        });

        this.velocity = Vector2D.zero();
    }

    public update(bullet: Bullet, params: CommandParms): void {
        if (bullet.enemy) {                       
            const vectorToEnemy = bullet.enemy.getPosition().sub(bullet.getPosition());
            this.velocity = vectorToEnemy.unit().multiply(this.speed);
            super.update(bullet, params);
        }
    }
}