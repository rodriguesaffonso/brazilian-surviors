import { Game } from "../../../game";
import { SkillKind, SkillNode, SkillPath } from "../interfaces";

export class MaxHealthSkillNode extends SkillNode {
  private p: number; // percentege increased

  constructor(p: number) { 
    super(SkillKind.MaxHealth);
    this.p = p;
  }

  public apply(game: Game): void {
    if (this.applied || this.locked) return;
    this.applied = true;

    game.player.combatComponent.maxHp *= (1 + this.p);
    game.player.combatComponent.hp *= (1 + this.p);
  }

  public description(): string {
    return `Player max health increased by ${Math.floor(this.p * 100)}%`;
  }
}


export class MaxHealthSkillPath extends SkillPath {
  constructor() {
    super({
      name: 'Max Health',
      path: [
        new MaxHealthSkillNode(0.1),
        new MaxHealthSkillNode(0.1),
        new MaxHealthSkillNode(0.1),
        new MaxHealthSkillNode(0.1),
        new MaxHealthSkillNode(0.1),
      ],
      nodeColor: '#f58231'
    });
  }
}