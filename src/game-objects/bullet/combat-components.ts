import { CombatComponent } from "../../components";
import { CombatComponentParams, GameObject } from "../../interfaces";
import { World } from "../world";
import { Bullet } from ".";


export class BulletCombatComponent extends CombatComponent {
    public damage: number = 20;
    public distToAttack: number = 5;

    constructor(params: CombatComponentParams) {
        super({ damage: 20 });
    }

    public update(bullet: Bullet, world: World): void {
        if (bullet.enemy) {
            const enemy = bullet.enemy;
            if (enemy.combatComponent.dead) {
                return;
            }

            if (this.canAttack(bullet, enemy)) {                
                enemy.combatComponent.takeHit(bullet.combatComponent.damage);

                if (enemy.combatComponent.dead) {
                    bullet.enemy = undefined;
                }
                console.log(enemy.kind, enemy);
            }
        } else {
            if (world.enemies.length > 0) {
                bullet.enemy = world.enemies[0];
            }
        }
    }

    private canAttack(bullet: Bullet, enemy: GameObject): boolean {
        return enemy.physicsComponent.position.sub(bullet.physicsComponent.position).modulo() < this.distToAttack;
    }
}
