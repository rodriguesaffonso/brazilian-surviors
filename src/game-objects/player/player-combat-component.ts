import { CombatComponent, CommandParms } from "../../components";
import { CombatComponentParams } from "../../utils";
import { Player } from "./player";

export class PlayerCombatComponent extends CombatComponent {
  public healthRegen: number; // per second
  private totalTime: number;
  private regenTimeout: number = 1000;

  constructor(params: CombatComponentParams) {
    super(params);
    this.healthRegen = params.healthRegen;
    this.totalTime = 0;
  }

  public update(player: Player, params: CommandParms): void {
    const { elapsedMs } = params;

    this.totalTime += elapsedMs;
    if (this.totalTime > this.regenTimeout) {
      this.totalTime -= this.regenTimeout;    
      this.hp = Math.min(this.hp + this.healthRegen, this.maxHp);
    }
  }
};