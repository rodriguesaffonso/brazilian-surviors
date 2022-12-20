import { CombatComponent } from "../../components";
import { Player } from "../player/player";
import { World } from "../world/world";
import { Triangle } from "./triangle";


export class TriangleCombatComponent extends CombatComponent {
    
    public distToAttack: number = 10;
    public damage = 8;
    public maxHp = 10;
    public hp = 10;

    public world: World;

    private lastAttackTime: number;
    private attackCooldownMs: number = 100;

    constructor(world: World) {
        super({ hp: 10, damage: 8 });
        this.world = world;
    }

    public update(enemy: Triangle): void {
        const player = enemy.player;
        if (player.combatComponent.dead) {
            return;
        }

        if (player.getPosition().sub(enemy.player.getPosition()).modulo() < this.distToAttack) {
            const currentTime = Date.now(); // TODO: pass time from game loop
            if (!this.lastAttackTime) {
                this.lastAttackTime = currentTime;
            }
            
            const elapsed = currentTime - this.lastAttackTime;
            if (elapsed <= this.attackCooldownMs) {
                return;
            }

            if (this.canAttack(enemy, player)) {
                player.combatComponent.takeHit(enemy.combatComponent.damage)
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
