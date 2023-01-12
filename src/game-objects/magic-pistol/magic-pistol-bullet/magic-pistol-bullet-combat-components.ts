import { CombatComponent, CommandParms } from "../../../components";
import { Game } from "../../../game";
import { GameObject, GameObjectKind } from "../../../utils";
import { Events } from "../../../utils/observer";
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

        const enemy = this.getCloseEnemy(bullet, params.game);
        if (enemy) {
            this.tryAttackEnemy(bullet, enemy);
        }
    }

    private tryAttackEnemy(bullet: MagicPistolBullet, enemy: GameObject): void {
        if (this.canAttack(bullet, enemy)) {
            enemy.combatComponent.takeHit(enemy, bullet.combatComponent.damage);
            
            this.dead = true;
            bullet.emit(Events.ObjectDead);
        }
    }

    private canAttack(bullet: MagicPistolBullet, enemy: GameObject): boolean {
        return !enemy.combatComponent.dead
            && enemy.getPosition().sub(bullet.getPosition()).modulo() < this.distToAttack;
    }

    private getCloseEnemy(bullet: MagicPistolBullet, g: Game): GameObject {
        for (const enemy of g.gameObjects.filter(obj => obj.kind === GameObjectKind.Triangle)) {
            if (this.canAttack(bullet, enemy)) {
                return enemy;
            }
        }
        return undefined;
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
