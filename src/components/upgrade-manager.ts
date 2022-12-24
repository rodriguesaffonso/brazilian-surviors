import { CommandParms } from "./params";

export enum TriggerReason {
  Time = 1,
  NumberOfKills
}

export class UpgradeManager {
  private timeMsUpgradesAt: number[];
  private killsUpgradesAt: number[];

  constructor() {
    this.timeMsUpgradesAt = [
      10,
      30,
      60 * 1,
      60 * 2,
      60 * 3,
    ].map(v => v * 1000);
    
    this.killsUpgradesAt = [
      10,
      20,
      50,
      75,
      100,
    ]
  }

  public update(reason: TriggerReason, params: CommandParms): void {
    const nextUpgradeValue = this.nextUpgradeAt(reason);
    if (!nextUpgradeValue) {
      return;
    }

    if (reason === TriggerReason.Time) {
      const totalElapsedMs = params.elapsedMs + params.game.lastTimestamp - params.game.startTimestamp;

      if (totalElapsedMs >= nextUpgradeValue) {
        console.log('Time upgrade triggered at', totalElapsedMs);
        this.timeMsUpgradesAt.splice(0, 1);
      }
    }
    else if (reason === TriggerReason.NumberOfKills) {
      if (params.game.kills >= nextUpgradeValue) {
        console.log('Kills upgrade triggered at', params.game.kills);
        this.killsUpgradesAt.splice(0, 1);    
      }
    }
  }

  private nextUpgradeAt(reason: TriggerReason): number {
    if (reason === TriggerReason.Time) {
      return this.timeMsUpgradesAt.at(0);
    }
    if (reason === TriggerReason.NumberOfKills) {
      return this.killsUpgradesAt.at(0);
    }
    return undefined;
  }
}