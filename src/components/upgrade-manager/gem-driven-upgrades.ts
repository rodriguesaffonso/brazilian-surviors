import { Game } from "../../game";
import { GameObject, GameObjectKind } from "../../utils";
import { UpgradeManager } from "./upgrade-manager";

export const GemDrivenUpgrades = [
  {
    value: 5,
    cb: (upgrade: UpgradeManager) => increaseBulletBy(upgrade.game, 1)
  },
  {
    value: 10,
    cb: (upgrade: UpgradeManager) => increasePlayerSpeed(upgrade.game, 0.2)
  },
  {
    value: 20,
    cb: (upgrade: UpgradeManager) => increaseBulletBy(upgrade.game, 1)
  },
]

function increaseBulletBy(game: Game, count: number = 1): void {
  let pistol: GameObject;
  for (const obj of game.gameObjects) {
    if (obj.kind === GameObjectKind.MagicPistol) {
      pistol = obj;
      break;
    }
  }
  pistol.combatComponent.amount += 1;
  alert(`Number of bullets increased by ${count}`);
}

function increasePlayerSpeed(game: Game, perc: number): void {
  game.player.physicsComponent.speed *= (1 + perc); // TODO: make player and camera use the same components
  game.camera.physicsComponent.speed *= (1 + perc);
  alert(`Player speed increased by ${perc * 100}%`);
}
