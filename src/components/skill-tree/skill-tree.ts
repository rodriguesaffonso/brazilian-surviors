import { Game } from "../../game";
import { SkillPath } from "./interfaces";
import { MaxHealthSkillPath } from "./paths/max-health";
import { NumberProjectilesSkillPath } from "./paths/number-projectiles";
import { SpeedSkillPath } from "./paths/speed";

export class SkillTree {
  private paths: SkillPath[];
  private maxOffers: number;

  constructor() {
    this.paths = [
      new MaxHealthSkillPath(),
      new SpeedSkillPath(),
      new NumberProjectilesSkillPath()
    ]
    this.maxOffers = 1;
  }

  public offers(): SkillPath[] {
    const possibleOffers = [];
    for (const path of this.paths) {
      if (!path.isComplete()) {
        possibleOffers.push(path);
      }
    }

    return possibleOffers
      .sort(() => Math.random() > 0.5 ? 1 : -1)
      .slice(0, this.maxOffers);
  }

  public apply(path: SkillPath, g: Game): void {
    if (path.isComplete) {
      throw Error('You cannot apply a new skill to a complete skill path');
    }

    path.apply(g);
  }
}