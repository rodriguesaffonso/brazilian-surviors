import { Game } from "../game";
import { World } from "../game-objects/world";

export interface CommandParms {
  elapsedMs: number,
  game: Game
}
