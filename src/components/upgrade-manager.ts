import { GameObject, GameObjectKind } from "../utils";
import { CommandParms } from "./interfaces";

export enum TriggerReason {
  Time = 1,
  NumberOfKills
}

export interface UpgradeItem {
  value: number;
  upgrade: (params: CommandParms) => void;
}

export class UpgradeManager {
  private timeMsUpgradesAt: UpgradeItem[];
  private killsUpgradesAt: UpgradeItem[];
  private baseParamsByObjectKind: Map<GameObjectKind, any>;

  constructor() {
    this.timeMsUpgradesAt = [
      { value: 1000 * 10, upgrade: () => this.overrideParams(GameObjectKind.Triangle, { hp: 45 }) },
      { value: 1000 * 30, upgrade: () => { } },
      { value: 1000 * 60 * 1, upgrade: () => { } },
      { value: 1000 * 60 * 2, upgrade: () => { } },
      { value: 1000 * 60 * 3, upgrade: () => { } },
    ];

    this.killsUpgradesAt = [
      {
        value: 10,
        upgrade: (params) => {
          params.game.player.physicsComponent.speed = 2; // TODO: make player and camera use the same components
          params.game.camera.physicsComponent.speed = 2;
        }
      },
      { 
        value: 20, 
        upgrade: (params) => {
          let pistol: GameObject;
          for (const obj of params.game.gameObjects) {
            if (obj.kind === GameObjectKind.MagicPistol) {
              pistol = obj;
              break;
            }
          }
          pistol.combatComponent.amount++;
        } 
      },
      { value: 50, upgrade: () => { } },
      { value: 75, upgrade: () => { } },
      { value: 100, upgrade: () => { } },
    ];

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

  public update(reason: TriggerReason, params: CommandParms): void {
    const nextUpgrade = this.nextUpgradeAt(reason);
    if (!nextUpgrade) {
      return;
    }

    const nextUpgradeValue: number = nextUpgrade.value;

    if (reason === TriggerReason.Time) {
      const totalElapsedMs = params.elapsedMs + params.game.lastTimestamp - params.game.startTimestamp;

      if (totalElapsedMs >= nextUpgradeValue) {
        this.timeMsUpgradesAt.splice(0, 1);
        nextUpgrade.upgrade?.(params);
      }
    }
    else if (reason === TriggerReason.NumberOfKills) {
      if (params.game.kills >= nextUpgradeValue) {
        this.killsUpgradesAt.splice(0, 1);
        nextUpgrade.upgrade?.(params);
      }
    }
  }

  private nextUpgradeAt(reason: TriggerReason): UpgradeItem {
    if (reason === TriggerReason.Time) {
      return this.timeMsUpgradesAt.at(0);
    }
    if (reason === TriggerReason.NumberOfKills) {
      return this.killsUpgradesAt.at(0);
    }
    return undefined;
  }

  private overrideParams(kind: GameObjectKind, config: any) {
    this.baseParamsByObjectKind.set(kind, { ...this.baseParamsByObjectKind.get(kind), ...config });
  }
}