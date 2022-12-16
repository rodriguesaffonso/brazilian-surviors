import { Triangle } from "./actors";
import { AbstractObject } from "./interfaces";
import { World } from "./world";

export interface ActionComponent {
    update(obj: AbstractObject): void;
}

export class TriangleActionComponent implements ActionComponent {
    public distToAttack: number = 10;
    public world: World;

    private lastAttackTime: number;
    private attackCooldownMs: number = 100;

    constructor(world: World) {
        this.world = world;
    }

    public update(enemy: Triangle): void {
        if (enemy.player.dead) {
            return;
        }

        if (enemy.player.center.sub(enemy.center).modulo() < this.distToAttack) {
            const currentTime = Date.now(); // TODO: pass time from game loop
            if (!this.lastAttackTime) {
                this.lastAttackTime = currentTime;
            }
            
            const elapsed = currentTime - this.lastAttackTime;
            if (elapsed > this.attackCooldownMs) {
                enemy.attack(enemy.player);
                this.lastAttackTime = currentTime;
            }
        }
    }
}