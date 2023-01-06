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
  },
  {
    value: 1000 * 20,
    cb: (upgrade: UpgradeManager) => increaseNewEnemyFrequency(upgrade.game, 0.15)
  },
  {
    value: 1000 * 25,
    cb: (upgrade: UpgradeManager) => increaseNewEnemyFrequency(upgrade.game, 0.15)
  },
  {
    value: 1000 * 30,
    cb: (upgrade: UpgradeManager) => increaseNewEnemyFrequency(upgrade.game, 0.15)
  },
  {
    value: 1000 * 35,
    cb: (upgrade: UpgradeManager) => increaseNewEnemyFrequency(upgrade.game, 0.15)
  },
  {
    value: 1000 * 40,
    cb: (upgrade: UpgradeManager) => increaseNewEnemyFrequency(upgrade.game, 0.5)
  },
  {
    value: 1000 * 45,
    cb: (upgrade: UpgradeManager) => increaseNewEnemyFrequency(upgrade.game, 0.5)
  },
  {
    value: 1000 * 50,
    cb: (upgrade: UpgradeManager) => increaseNewEnemyFrequency(upgrade.game, 0.5)
  },
  {
    value: 1000 * 55,
    cb: (upgrade: UpgradeManager) => increaseNewEnemyFrequency(upgrade.game, 0.5)
  },
  {
    value: 1000 * 60,
    cb: (upgrade: UpgradeManager) => increaseNewEnemyFrequency(upgrade.game, 0.1)
  },
]

function updateNewEnemyFrequency(game: Game, freq: number) {
  game.newObjectFrequency = freq;
  console.log(`newObjectFrequency: ${game.newObjectFrequency}`);
}

function increaseNewEnemyFrequency(game: Game, perc: number) {
  game.newObjectFrequency *= (1 + perc);
  console.log(`newObjectFrequency: ${game.newObjectFrequency}`);
}

