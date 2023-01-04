import { Game } from "../game";
import { GameObject } from "../utils";

export interface CommandParms {
  elapsedMs: number,
  game: Game
}

export interface Component {
  update(obj: GameObject, params?: CommandParms): void;
}
