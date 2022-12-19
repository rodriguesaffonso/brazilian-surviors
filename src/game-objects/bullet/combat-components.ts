import { CombatComponent, CombatComponentParams } from "../../components";
import { AbstractObject } from "../../interfaces";
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
            if (enemy.dead) {
                return;
            }

            if (this.canAttack(bullet, enemy)) {                
                enemy.takeHit(bullet.damage);

                if (enemy.dead) {
                    bullet.enemy = undefined;
                }
            }
        } else {
            if (world.enemies.length > 0) {
                bullet.enemy = world.enemies[0];
            }
        }
    }

    private canAttack(bullet: Bullet, enemy: AbstractObject): boolean {
        return enemy.center.sub(bullet.center).modulo() < this.distToAttack;
    }
}
