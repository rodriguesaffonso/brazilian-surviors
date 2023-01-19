import { Game } from "../../../game";
import { GameObjectKind } from "../../../utils";
import { SkillKind, SkillNode, SkillPath } from "../interfaces";

export class WeaponDamageSkillNode extends SkillNode {
  private p: number; // percentage increased

  constructor(p: number) {
    super(SkillKind.WeaponDamage);
    this.p = p;
  }

  public apply(game: Game): void {
    if (this.applied || this.locked) return;
    this.applied = true;

    const baseParams = game.upgradeManager.getBaseParams(GameObjectKind.MagicPistolBullet);
    game.upgradeManager.updateBaseParams(GameObjectKind.MagicPistolBullet, { ...baseParams, damage: baseParams.damage * (1 + this.p) });
  }

  public description(): string {
    return `Weapon damage increased by ${Math.floor(Math.abs(this.p * 100))}%`;
  }
}


export class WeaponDamageSkillPath extends SkillPath {
  constructor() {
    super({
      path: [
        new WeaponDamageSkillNode(0.15),
        new WeaponDamageSkillNode(0.15),
        new WeaponDamageSkillNode(0.15),
        new WeaponDamageSkillNode(0.15),
        new WeaponDamageSkillNode(0.15)
      ],
      nodeColor: '#4363d8'
    });
  }
}