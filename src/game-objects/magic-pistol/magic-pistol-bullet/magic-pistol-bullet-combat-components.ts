import { CombatComponent, CommandParms } from "../../../components";
import { GameObject } from "../../../interfaces";
import { Events } from "../../../interfaces/observer";
import { MagicPistolBullet } from "./magic-pistol-bullet";

export class MagicPistolBulletCombatComponent extends CombatComponent {
    public durationTimeout: number;
    public distToAttack: number;

    constructor() {
        super({
            duration: 2000,
            damage: 20
        });
        this.durationTimeout = this.duration;
        this.distToAttack = 5;
    }

    public update(bullet: MagicPistolBullet, params: CommandParms): void {
        this.updateDurationTimeout(bullet, params.elapsedMs);

        if (bullet.targetEnemy) {
            const enemy = bullet.targetEnemy;
            if (this.canAttack(bullet, enemy)) {
                enemy.combatComponent.takeHit(enemy, bullet.combatComponent.damage);

                this.dead = true;
                bullet.emit(Events.ObjectDead);
            }
        }
    }

    private canAttack(bullet: MagicPistolBullet, enemy: GameObject): boolean {
        return !enemy.combatComponent.dead
            && enemy.getPosition().sub(bullet.getPosition()).modulo() < this.distToAttack;
    }

    private updateDurationTimeout(bullet: MagicPistolBullet, elapsedMs: number): void {
        if (bullet.combatComponent.dead) return;

        this.durationTimeout -= elapsedMs;
        if (this.durationTimeout <= 0) {
            this.dead = true;
            bullet.emit(Events.ObjectDead);
        }
    }
}
