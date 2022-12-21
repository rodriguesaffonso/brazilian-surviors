import { CombatComponent, CommandParms } from "../../components";
import { CombatComponentParams, GameObject } from "../../interfaces";
import { Bullet } from ".";


export class BulletCombatComponent extends CombatComponent {
    public distToAttack: number = 5;
    public cooldownTimeout: number;
    public readyToAttack: boolean;

    constructor(params: CombatComponentParams) {
        super({ damage: params.damage ?? 20, coldown: params.coldown ?? 1000 });
        this.cooldownTimeout = 0;
        this.readyToAttack = false;
    }

    public update(bullet: Bullet, params: CommandParms): void {
        this.cooldownTimeout -= params.elapsedMs;
        if (this.cooldownTimeout <= 0) {
            this.cooldownTimeout = 0;
            this.readyToAttack = true;
        }

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

                this.readyToAttack = false;
            }
        } else {
            const { world } = params;
            if (!world) throw Error(`Missing world in update params of bullet class`);

            if (world.enemies.length > 0) {
                bullet.enemy = world.enemies[0];
            }
        }
        this.resetCooldown();
    }

    private canAttack(bullet: Bullet, enemy: GameObject): boolean {
        return this.readyToAttack && enemy.getPosition().sub(bullet.getPosition()).modulo() < this.distToAttack;
    }

    private resetCooldown(): void {
        if (this.cooldownTimeout <= 0) {
            this.cooldownTimeout = this.cooldown;
        }
    }
}
