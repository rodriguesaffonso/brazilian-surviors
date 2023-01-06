import { Game } from "../../game";
import { Events, GameObjectKind } from "../../utils";
import { CommandParms } from "../interfaces";
import { GemDrivenUpgrades } from "./gem-driven-upgrades";
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
  // Gem upgrades
  private gemDrivenUpgrades;
  private gemIndex: number;

  constructor(g: Game) {
    this.game = g;
    this.totalElapsedGameTime = 0;
    this.timeDrivenUpgrades = TimeDrivenUpgrades;
    this.timeIndex = 0;
    this.gemDrivenUpgrades = GemDrivenUpgrades;
    this.gemIndex = 0;

    this.baseParamsByObjectKind = new Map([
      [GameObjectKind.Triangle, {
        hp: 10,
        damage: 8,
        probToGenerate: 0.75
      }]
    ]);
  }

  public getBaseParams(kind: GameObjectKind): any {
    return this.baseParamsByObjectKind.get(kind);
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
        if (this.gemIndex === this.gemDrivenUpgrades.length) return;
        nextUpgrade = this.gemDrivenUpgrades[this.gemIndex];

        if (this.game.gemsCollected >= nextUpgrade.value) {
          nextUpgrade.cb(this);
          this.gemIndex++;
        }
    }
  }
}