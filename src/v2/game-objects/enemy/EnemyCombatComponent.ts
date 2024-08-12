import { Events } from "../../../utils";
import { CombatComponent } from "../../components/CombatComponent";
import { IComponentUpdateParams } from "../../components/Component";
import { IGame } from "../../game/IGame";
import { Timer } from "../../timer/Timer";
import { GameObject } from "../GameObject";
import { Player } from "../player/Player";
import { Enemy } from "./Enemy";
import { EnemyCollisionComponent } from "./EnemyCollisionComponent";

const enum EnemyCombatState {
    Idle,
    AttackOnCooldown,
};

export class EnemyCombatComponent extends CombatComponent {
    private state: EnemyCombatState;
    private attackCooldownMs: number = 1000;
    private game: IGame;
    private attackDamage: number = 10;
    constructor(collision: EnemyCollisionComponent) {
        super();
        this.state = EnemyCombatState.Idle;
        collision.on(Events.EnemyCollisionComponent_CollidingWithPlayer, (player: Player) => {
            this.tryAttack(player);
        });
    }
    public update(obj: Enemy, params?: IComponentUpdateParams): void {
        if (this.game === undefined) {
            this.game = params.game;
        }
    }
    private tryAttack(player: GameObject): void {
        if (this.state === EnemyCombatState.AttackOnCooldown) {
            console.log('Enemy attack on cooldown');
            return;
        }

        console.log('Attacking player!');
        player.healthComponent.takeDamage(this.attackDamage);
        this.startAttackCooldown();
    }
    private startAttackCooldown() {
        const attackCooldownTimer = new Timer(this.game.clock, this.attackCooldownMs);
        attackCooldownTimer
            .on(Events.Timer_TimeoutFinished, () => {
                this.state = EnemyCombatState.Idle;
            });
        this.game.queueTimer(attackCooldownTimer);
        this.state = EnemyCombatState.AttackOnCooldown;
    }
}