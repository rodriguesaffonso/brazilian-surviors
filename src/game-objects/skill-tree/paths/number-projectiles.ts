import { Game } from "../../../game";
import { GameObject, GameObjectKind } from "../../../utils";
import { SkillKind, SkillNode, SkillPath } from "../interfaces";

export class NumberProjectilesSkillNode extends SkillNode {
  private count: number; // amount increased

  constructor(count: number) {
    super(SkillKind.NumberProjectiles);
    this.count = count;
  }

  public apply(game: Game): void {
    if (this.applied || this.locked) return;
    this.applied = true;

    let pistol: GameObject;
    for (const obj of game.gameObjects) {
      if (obj.kind === GameObjectKind.MagicPistol) {
        pistol = obj;
        break;
      }
    }
    pistol.combatComponent.amount += 1;
  }

  public description(): string {
    return `Number of bullets increased by ${this.count}`;
  }
}


export class NumberProjectilesSkillPath extends SkillPath {
  constructor() {
    super({
      name: 'More Bullets',
      path: [
        new NumberProjectilesSkillNode(1),
        new NumberProjectilesSkillNode(1),
        new NumberProjectilesSkillNode(1)
      ],
      nodeColor: '#3cb44b'
    });
  }
}