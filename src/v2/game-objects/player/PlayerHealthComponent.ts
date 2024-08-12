import { Events } from "../../../utils";
import { HealthComponent, HealthComponentParams } from "../../components/HealthComponent";
import { IGame } from "../../game/IGame";
import { Timer } from "../../timer/Timer";

export class PlayerHealthComponent extends HealthComponent {
  private game: IGame;

  private healthRegenCooldownMs: number = 5000;
  private healthRegenCooldownTimer: Timer;
  private healthRegenValue: number = 2;

  constructor(params: HealthComponentParams, game: IGame) {
    super({
      hp: 200,
      maxHp: 200,
      ...params
    });
    this.on(Events.HealthComponent_DamageTaken, (value) => {
      console.log('Player damage taken', value, this.hp);
      this.startHealthRegenCooldown();
    })
      .on(Events.HealthComponent_HealthRegen, (value) => {
        console.log('Player health regen', value, this.hp);
        this.startHealthRegenCooldown();
      })
      .on(Events.HealthComponent_Dead, () => {
        console.log('Player dead');
      })
      .on(Events.PlayerHealthComponent_AutoHealthRegen, () => {
        console.log('Player healed by auto health regen');
      })
    this.game = game;
  }

  private startHealthRegenCooldown() {
    if (this.dead) {
      return;
    }
    if (this.hp === this.maxHp) {
      return;
    }
    if (this.healthRegenCooldownTimer !== undefined) {
      this.game.cancelTimer(this.healthRegenCooldownTimer);
      this.healthRegenCooldownTimer = undefined;
    }
    this.healthRegenCooldownTimer = new Timer(this.game.clock, this.healthRegenCooldownMs);
    this.healthRegenCooldownTimer.on(Events.Timer_TimeoutFinished, () => {
      this.healthRegenCooldownTimer = undefined;

      this.healthRegen(this.healthRegenValue);
      this.emit(Events.PlayerHealthComponent_AutoHealthRegen);
    });
    this.game.queueTimer(this.healthRegenCooldownTimer);
  }
}