import { Game } from "../../game";
import { UpgradeManager } from "./upgrade-manager";

export const TimeDrivenUpgrades = [
  {
    value: 1000 * 10, 
    cb: (upgrade: UpgradeManager) => updateNewEnemyFrequency(upgrade.game, 4)
  },
  {
    value: 1000 * 15,
    cb: (upgrade: UpgradeManager) => updateNewEnemyFrequency(upgrade.game, 1)
  }
]

function updateNewEnemyFrequency(game: Game, freq: number) {
  game.newObjectFrequency = freq;
}