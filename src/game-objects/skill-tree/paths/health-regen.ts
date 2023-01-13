import { Game } from "../../../game";
import { PlayerCombatComponent } from "../../../game-objects/player";
import { SkillKind, SkillNode, SkillPath } from "../interfaces";

export class HealthRegenSkillNode extends SkillNode {
  private amount: number; // amount increased

  constructor(amount: number) { 
    super(SkillKind.HealthRegen);
    this.amount = amount;
  }

  public apply(game: Game): void {
    if (this.applied || this.locked) return;
    this.applied = true;

    (game.player.combatComponent as PlayerCombatComponent).healthRegen += this.amount;
  }

  public description(): string {
    return `Player health regen increased by ${this.amount} HP/s`;
  }
}


export class HealthRegenSkillPath extends SkillPath {
  constructor() {
    super({
      path: [
        new HealthRegenSkillNode(0.2),
        new HealthRegenSkillNode(0.2),
        new HealthRegenSkillNode(0.2),
        new HealthRegenSkillNode(1),
        new HealthRegenSkillNode(2),
      ],
      nodeColor: '#e6194B'
    });
  }
}