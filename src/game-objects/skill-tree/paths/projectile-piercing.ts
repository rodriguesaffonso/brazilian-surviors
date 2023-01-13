import { Game } from "../../../game";
import { GameObjectKind } from "../../../utils";
import { SkillKind, SkillNode, SkillPath } from "../interfaces";

export class ProjectilePiercingSkillNode extends SkillNode {
  private count: number; // amount increased

  constructor(count: number) {
    super(SkillKind.ProjectilePiercing);
    this.count = count;
  }

  public apply(game: Game): void {
    if (this.applied || this.locked) return;
    this.applied = true;

    const baseParams = game.upgradeManager.getBaseParams(GameObjectKind.MagicPistolBullet);
    game.upgradeManager.updateBaseParams(GameObjectKind.MagicPistolBullet, { ...baseParams, piercingCount: baseParams.piercingCount + this.count });
  }

  public description(): string {
    return `Bullets can get through ${this.count} more enem${this.count === 1 ? 'y' : 'ies'}`;
  }
}


export class ProjectilePiercingSkillPath extends SkillPath {
  constructor() {
    super({
      path: [
        new ProjectilePiercingSkillNode(1),
        new ProjectilePiercingSkillNode(1),
        new ProjectilePiercingSkillNode(1),
        new ProjectilePiercingSkillNode(1)
      ],
      nodeColor: '#000075'
    });
  }
}