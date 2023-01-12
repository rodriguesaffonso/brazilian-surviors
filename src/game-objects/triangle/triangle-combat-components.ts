import { CombatComponent } from "../../components";
import { CombatComponentParams } from "../../utils";
import { Player } from "../player/player";
import { World } from "../world/world";
import { Triangle } from "./triangle";


export class TriangleCombatComponent extends CombatComponent {
    public distToAttack: number = 10;

    private lastAttackTime: number;
    private attackCooldownMs: number = 100;

    constructor(params: CombatComponentParams) {
        super(params);
    }

    public update(enemy: Triangle): void {
        const player = enemy.player;
        if (player.combatComponent.dead) {
            return;
        }

        if (player.getPosition().sub(enemy.player.getPosition()).modulo() < this.distToAttack) {
            const currentTime = Date.now();
            if (!this.lastAttackTime) {
                this.lastAttackTime = currentTime;
            }

            const elapsed = currentTime - this.lastAttackTime;
            if (elapsed <= this.attackCooldownMs) {
                return;
            }

            if (this.canAttack(enemy, player)) {
                player.combatComponent.takeHit(player, enemy.combatComponent.damage)
                this.lastAttackTime = currentTime;
            }
        }
    }

    private canAttack(enemy: Triangle, player: Player): boolean {
        const p = player.getPosition();
        const e = enemy.getPosition();
        return e.sub(p).modulo() < this.distToAttack;
    }
}
