import { CombatComponent, CommandParms } from "../../components";
import { CombatComponentParams, GameObject } from "../../interfaces";
import { Bullet } from ".";


export class BulletCombatComponent extends CombatComponent {
    public distToAttack: number = 5;
    public cooldownTimeout: number;
    public readyToAttack: boolean;
    public durationTimeout: number;

    constructor(params: CombatComponentParams) {
        super({
            damage: params.damage ?? 20,
            coldown: params.coldown ?? 500,
            duration: params.duration ?? 5000
        });
        this.cooldownTimeout = 0;
        this.readyToAttack = false;
        this.durationTimeout = this.duration;
    }

    public update(bullet: Bullet, params: CommandParms): void {
        if (this.dead) return;
        this.decreaseCooldownTimeout(params);
        this.updateDurationTimeout(params);

        if (bullet.enemy) {
            const enemy = bullet.enemy;
            if (enemy.combatComponent.dead) {
                return;
            }

            if (this.canAttack(bullet, enemy)) {
                enemy.combatComponent.takeHit(bullet.combatComponent.damage);

                if (enemy.combatComponent.dead) {
                    bullet.enemy = undefined;
                    bullet.gun.trackingEnemies.delete(enemy);
                }

                this.readyToAttack = false;
            }
        } else {
            const { world } = params;
            if (!world) throw Error(`Missing world in update params of bullet class`);

            if (world.enemies.length > 0) {
                const { gun } = bullet;
                for (const enemy of world.enemies) {
                    if (!gun.trackingEnemies.has(enemy)) {
                        bullet.enemy = enemy;
                        gun.trackingEnemies.add(enemy);
                    }
                }
            }
        }
        this.resetCooldown();
    }

    private canAttack(bullet: Bullet, enemy: GameObject): boolean {
        return this.readyToAttack && enemy.getPosition().sub(bullet.getPosition()).modulo() < this.distToAttack;
    }

    private decreaseCooldownTimeout(params: CommandParms): void {
        if (!this.readyToAttack) {
            this.cooldownTimeout -= params.elapsedMs;
            if (this.cooldownTimeout <= 0) {
                this.cooldownTimeout = 0;
                this.readyToAttack = true;
            }
        }
    }

    private resetCooldown(): void {
        if (!this.readyToAttack && this.cooldownTimeout <= 0) {
            this.cooldownTimeout = this.cooldown;
        }
    }

    private updateDurationTimeout(params: CommandParms): void {
        this.durationTimeout -= params.elapsedMs;
        if (this.durationTimeout <= 0) {
            this.durationTimeout = 0;
            this.dead = true;
        }
    }
}
