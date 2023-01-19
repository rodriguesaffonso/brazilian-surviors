import { Game } from "../../../game";
import { GameObject, GameObjectKind } from "../../../utils";
import { SkillKind, SkillNode, SkillPath } from "../interfaces";

export class WeaponCooldownSkillNode extends SkillNode {
  private p: number; // percentage increased

  constructor(p: number) {
    super(SkillKind.WeaponCooldown);
    this.p = p;
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
    pistol.combatComponent.cooldown *= 1 + this.p;
  }

  public description(): string {
    return `Weapon cooldown reduced by ${Math.floor(Math.abs(this.p * 100))}%`;
  }
}


export class WeaponCooldownSkillPath extends SkillPath {
  constructor() {
    super({
      path: [
        new WeaponCooldownSkillNode(-0.1),
        new WeaponCooldownSkillNode(-0.1),
        new WeaponCooldownSkillNode(-0.1),
        new WeaponCooldownSkillNode(-0.1),
        new WeaponCooldownSkillNode(-0.1)
      ],
      nodeColor: '#42d4f4'
    });
  }
}