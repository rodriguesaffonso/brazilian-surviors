import { CommandParms, PhysicsComponent } from "../../../components";
import { PhysicsComponentParams, Vector2D } from "../../../interfaces";
import { MagicPistolBullet } from "./magic-pistol-bullet";

export class MagicPistolBulletPhysicsComponent extends PhysicsComponent {
    constructor(params: PhysicsComponentParams) { 
        super({ 
            speed: params.speed ?? 3,
            position: params.position
        });

        this.velocity = Vector2D.zero();
    }

    public update(bullet: MagicPistolBullet, params: CommandParms): void {
        if (bullet.targetEnemy) {                       
            const vectorToEnemy = bullet.targetEnemy.getPosition().sub(bullet.getPosition());
            this.velocity = vectorToEnemy.unit().multiply(this.speed);
        }

        super.update(bullet, params);
    }
}