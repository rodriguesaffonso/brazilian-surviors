import { Game } from "../../../game";
import { GameObjectKind } from "../../../utils";
import { SkillKind, SkillNode, SkillPath } from "../interfaces";
import { GemPhysicsComponent } from "../../../game-objects/gem";

export class MagnetRangeSkillNode extends SkillNode {
  private p: number; // percentege increased

  constructor(p: number) { 
    super(SkillKind.MagnetRange);
    this.p = p;
  }

  public apply(game: Game): void {
    if (this.applied || this.locked) return;
    this.applied = true;

    const baseParams = game.upgradeManager.getBaseParams(GameObjectKind.Gem);
    game.upgradeManager.updateBaseParams(GameObjectKind.Gem, { ...baseParams, radiusToPlayer: baseParams.radiusToPlayer * (1 + this.p) });
    game.gameObjects.forEach(obj => {
      if (obj.kind === GameObjectKind.Gem) {
        (obj.physicsComponent as GemPhysicsComponent).radiusToPlayer *= (1 + this.p);
      }
    })
  }

  public description(): string {
    return `Magnet range increased by ${Math.floor(this.p * 100)}%`;
  }
}


export class MagnetRangeSkillPath extends SkillPath {
  constructor() {
    super({
      name: 'Magnet Range',
      path: [
        new MagnetRangeSkillNode(0.15),
        new MagnetRangeSkillNode(0.15),
        new MagnetRangeSkillNode(0.15),
        new MagnetRangeSkillNode(0.15),
      ],
      nodeColor: '#dcbeff'
    });
  }
}