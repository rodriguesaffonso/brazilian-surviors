import { ActionComponent } from "../../components/action-components";
import { Player } from "../player/player";
import { World } from "../world/world";
import { Triangle } from "./triangle";


export class TriangleActionComponent implements ActionComponent {
    public distToAttack: number = 10;
    public damage = 8;
    public maxHp = 10;
    public hp = 10;

    public world: World;

    private lastAttackTime: number;
    private attackCooldownMs: number = 100;

    constructor(world: World) {
        this.world = world;
    }

    public update(enemy: Triangle): void {
        const player = enemy.player;
        if (player.dead) {
            return;
        }

        if (player.center.sub(enemy.center).modulo() < this.distToAttack) {
            const currentTime = Date.now(); // TODO: pass time from game loop
            if (!this.lastAttackTime) {
                this.lastAttackTime = currentTime;
            }
            
            const elapsed = currentTime - this.lastAttackTime;
            if (elapsed <= this.attackCooldownMs) {
                return;
            }

            if (this.canAttack(enemy, player)) {
                player.takeHit(enemy.damage)
                this.lastAttackTime = currentTime;
            }
        }
    }

    private canAttack(enemy: Triangle, player: Player): boolean {
        return enemy.center.sub(player.center).modulo() < this.distToAttack;
    }
}
