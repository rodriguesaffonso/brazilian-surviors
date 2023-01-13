import { Game } from "../../game";
import { GameObjectKind } from "../../utils";

export const TimeDrivenUpgrades = [
  // LEVEL 1
  { value: 0 * 60 * 1000, cb: (g: Game) => newLevel(g, { hp: 10, damage: 8, color: "#8DAA9D" }) },
  ...slowEnemyFreqIncrease(0),
  
  // LEVEL 2
  { value: 1 * 60 * 1000, cb: (g: Game) => newLevel(g, { hp: 15, damage: 10, color: "#2660A4" }) },
  ...slowEnemyFreqIncrease(1 * 60 * 1000),
  
  // LEVEL 3
  { value: 2 * 60 * 1000, cb: (g: Game) => newLevel(g, { hp: 25, damage: 15, color: "#E49AB0" }) },
  ...slowEnemyFreqIncrease(2 * 60 * 1000),
  
  // LEVEL 4
  { value: 3 * 60 * 1000, cb: (g: Game) => newLevel(g, { hp: 30, damage: 20, color: "#FAC05E" }) },
  ...slowEnemyFreqIncrease(3 * 60 * 1000),
  
  // LEVEL 5
  { value: 4 * 60 * 1000, cb: (g: Game) => newLevel(g, { hp: 40, damage: 25, color: "#AF1B3F" }) },
  ...slowEnemyFreqIncrease(4 * 60 * 1000),
]

function slowEnemyFreqIncrease(time: number) {
  return [
    { value: 1000 * 10 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
    { value: 1000 * 15 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
    { value: 1000 * 20 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
    { value: 1000 * 25 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
    { value: 1000 * 30 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
    { value: 1000 * 35 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
    { value: 1000 * 40 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
    { value: 1000 * 45 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
    { value: 1000 * 50 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
    { value: 1000 * 55 + time, cb: (g: Game) => increaseNewEnemyFrequency(g, 0.15) },
  ]
}

function newLevel(g: Game, params: any) {
  overrideBaseParams(g, params);
  g.newObjectFrequency = 1;
}

function overrideBaseParams(g: Game, params: any): void {
  const baseParams = g.upgradeManager.getBaseParams(GameObjectKind.Triangle);
  g.upgradeManager.updateBaseParams(GameObjectKind.Triangle, { ...baseParams, ...params });
}
function increaseNewEnemyFrequency(game: Game, perc: number) {
  game.newObjectFrequency *= (1 + perc);
}

