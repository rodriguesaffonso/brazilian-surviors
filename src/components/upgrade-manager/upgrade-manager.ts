import { Game } from "../../game";
import { Events, GameObjectKind } from "../../utils";
import { CommandParms } from "../interfaces";
import { SkillTree } from "../skill-tree/skill-tree";
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
    alert(skillPath.nextUpgrade().description());
    skillPath.apply(this.game);
  }
}