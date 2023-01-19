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
  private timeDrivenUpgrades;
  private timeIndex: number;
  private gemsToNextLevel;
  private gemBase: number;
  public level: number;

  private skillTree: SkillTree;

  constructor(g: Game) {
    this.game = g;
    this.timeDrivenUpgrades = TimeDrivenUpgrades.sort((a, b) => a.value - b.value);
    this.timeIndex = 0;
    this.gemsToNextLevel = 5;
    this.gemBase = this.gemsToNextLevel;
    this.level = 1;

    this.baseParamsByObjectKind = new Map([
      [GameObjectKind.Triangle, {
        hp: 10,
        damage: 8,
        probToGenerate: 0.75,
        radius: 5,
        color: "#8DAA9D"
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
        piercingCount: 1,
        damage: 12
      }]
    ]);

    this.skillTree = g.skillTree;
  }

  public getBaseParams(kind: GameObjectKind): any {
    return this.baseParamsByObjectKind.get(kind);
  }

  public updateBaseParams(kind: GameObjectKind, params: any): void {
    this.baseParamsByObjectKind.set(kind, params);
  }

  public nextXpUpgradeAt(): number {
    return this.gemsToNextLevel;
  }

  public tryTriggerNextUpgrage(event: Events): void {
    let nextUpgrade;
    switch (event) {
      case Events.NextTimestamp:
        if (this.timeIndex === this.timeDrivenUpgrades.length) return;
        nextUpgrade = this.timeDrivenUpgrades[this.timeIndex];

        if (this.game.clock.getTotalElapsedTime() >= nextUpgrade.value) {
          nextUpgrade.cb(this.game);
          this.timeIndex++;
        }

        break;
      case Events.ItemCollected:
        this.applyRandomSkillUpgrade();
    }
  }

  private applyRandomSkillUpgrade(): void {
    if (this.game.gemsCollected % this.totalGemsToLevel(this.level) !== 0) return;
    this.level++;

    const offers = this.skillTree.offers();
    if (offers.length === 0) return;

    const skillPath = offers[0];
    const nextUpgrade = skillPath.nextUpgrade();
    if (nextUpgrade) {
      this.game.skillNotificationManager.add({ path: skillPath, node: nextUpgrade });
    }
    this.game.skillTree.apply(skillPath, this.game);
  }

  public gemsToLevel(level: number): number {
    return this.gemBase + level - 1;
  }

  public totalGemsToLevel(level: number): number {
    return level * (2 * this.gemBase + level - 1) / 2;
  }
}