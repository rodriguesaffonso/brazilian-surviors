import { Events } from "../../../../utils";
import { CombatComponent } from "../../../components/CombatComponent";
import { IComponentUpdateParams } from "../../../components/Component";
import { IGame } from "../../../game/IGame";
import { Timer } from "../../../timer/Timer";
import { Enemy } from "../../enemy/Enemy";
import { GameObject } from "../../GameObject";
import { SpinningBallCollisionComponent } from "./SpinningBallCollisionComponent";

export class SpinningBallCombatComponent extends CombatComponent {
  private game: IGame;
  private attackDamage: number = 80;
  private attackCooldownMs: number = 1000;

  private enemyOnCooldown: Set<Enemy>;

  constructor(collision: SpinningBallCollisionComponent) {
    super();
    this.enemyOnCooldown = new Set();
    collision.on(Events.SpinningBallCollisionComponent_CollidingWithEnemy, (enemy: Enemy) => {
      this.tryAttack(enemy);
    });
  }

  public update(obj: Enemy, params?: IComponentUpdateParams): void {
    if (this.game === undefined) {
      this.game = params.game;
    }
  }
  private tryAttack(enemy: GameObject): void {
    if (this.enemyOnCooldown.has(enemy)) {
      console.log('Enemy on cooldown for attacking');
      return;
    }

    enemy.healthComponent.on(Events.HealthComponent_Dead, () => {
      if (this.enemyOnCooldown.has(enemy)) {
        this.enemyOnCooldown.delete(enemy);
      }
    }); 

    enemy.healthComponent.takeDamage(this.attackDamage);
    this.startAttackCooldown(enemy);
  }
  private startAttackCooldown(enemy: Enemy) {
    const attackCooldownTimer = new Timer(this.game.clock, this.attackCooldownMs);
    attackCooldownTimer
      .on(Events.Timer_TimeoutFinished, () => {
        if (this.enemyOnCooldown.has(enemy)) {
          this.enemyOnCooldown.delete(enemy);
        }
      });
    this.game.queueTimer(attackCooldownTimer);
    this.enemyOnCooldown.add(enemy);
  }
}