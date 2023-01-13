import { Game } from "../../../game";
import { SkillKind, SkillNode, SkillPath } from "../interfaces";

export class SpeedSkillNode extends SkillNode {
  private p: number; // percentege increased

  constructor(p: number) {
    super(SkillKind.Speed);
    this.p = p;
  }

  public apply(game: Game): void {
    if (this.applied || this.locked) return;
    this.applied = true;

    game.player.physicsComponent.speed *= (1 + this.p);
    game.camera.physicsComponent.speed *= (1 + this.p);
  }

  public description(): string {
    return `Player speed increased by ${Math.floor(this.p * 100)}%`;
  }
}

export class SpeedSkillPath extends SkillPath {
  constructor() {
    super({
      path: [
        new SpeedSkillNode(0.1),
        new SpeedSkillNode(0.1),
        new SpeedSkillNode(0.1),
        new SpeedSkillNode(0.1),
        new SpeedSkillNode(0.1),
      ],
      nodeColor: '#ffe119'
    });
  }
}