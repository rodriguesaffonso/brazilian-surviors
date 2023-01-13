import { Game } from "../../game";
import { SkillTree } from "../../game-objects/skill-tree/skill-tree";
import { Events, GameObjectKind } from "../../utils";
import { CommandParms } from "../interfaces";
import { TimeDrivenUpgrades } from "./time-driven-upgrades";

export enum TriggerReason {
  Time = 1,
  Kills,
  Gems
}

export interface UpgradeItem {
  value: number;
  upgrade: (params: CommandParms) => void;
}

export class UpgradeManager {
  private baseParamsByObjectKind: Map<GameObjectKind, any>;

  public game: Game;
  // Time upgrades
  private totalElapsedGameTime: number;
  private timeDrivenUpgrades;
  private timeIndex: number;

  private skillTree: SkillTree;

  constructor(g: Game) {
    this.game = g;
    this.totalElapsedGameTime = 0;
    this.timeDrivenUpgrades = TimeDrivenUpgrades;
    this.timeIndex = 0;

    this.baseParamsByObjectKind = new Map([
      [GameObjectKind.Triangle, {
        hp: 10,
        damage: 8,
        probToGenerate: 0.75
      }],
      [GameObjectKind.Gem, {
        radiusToPlayer: 30
      }],
      [GameObjectKind.Player, {
        healthRegen: 0
      }],
      [GameObjectKind.MagicPistol, {
        cooldown: 1200
      }],
      [GameObjectKind.MagicPistolBullet, {
        piercingCount: 1
      }]
    ]);

    this.skillTree = g.skillTree;
  }

  public getBaseParams(kind: GameObjectKind): any {
    return this.baseParamsByObjectKind.get(kind);
  }

  public updateBaseParams(kind: GameObjectKind, params: any) : void {
    this.baseParamsByObjectKind.set(kind, params);
  }

  public tryTriggerNextUpgrage(event: Events, param?: number): void {
    let nextUpgrade;
    switch (event) {
      case Events.NextTimestamp:
        if (this.timeIndex === this.timeDrivenUpgrades.length) return;
        nextUpgrade = this.timeDrivenUpgrades[this.timeIndex];

        const elapsed = param;
        this.totalElapsedGameTime += elapsed;
        
        if (this.totalElapsedGameTime >=  nextUpgrade.value) {
          nextUpgrade.cb(this);
          this.timeIndex++;
        }
        
        break;
      case Events.ItemCollected:
        this.applyRandomSkillUpgrade();
    }
  }

  private applyRandomSkillUpgrade(): void {
    if (this.game.gemsCollected % 5 !== 0) return;
    
    const offers = this.skillTree.offers();
    if (offers.length === 0) return;
    
    const skillPath = offers[0];
    this.game.skillTree.apply(skillPath, this.game);
    
    const nextUpgrade = skillPath.nextUpgrade();
    if (nextUpgrade) {
      console.log(nextUpgrade.description());
    }
  }
}