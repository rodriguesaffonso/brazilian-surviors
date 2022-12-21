import { CombatComponent, CommandParms } from "../../components";
import { CombatComponentParams, GameObject } from "../../interfaces";
import { Bullet } from ".";


export class BulletCombatComponent extends CombatComponent {
    public damage: number = 20;
    public distToAttack: number = 5;

    constructor(params: CombatComponentParams) {
        super({ damage: 20 });
    }

    public update(bullet: Bullet, params: CommandParms): void {
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
            }
        } else {
            const { world } = params;
            if (!world) throw Error(`Missing world in update params of bullet class`);

            if (world.enemies.length > 0) {
                bullet.enemy = world.enemies[0];
            }
        }
    }

    private canAttack(bullet: Bullet, enemy: GameObject): boolean {
        return enemy.getPosition().sub(bullet.getPosition()).modulo() < this.distToAttack;
    }
}
