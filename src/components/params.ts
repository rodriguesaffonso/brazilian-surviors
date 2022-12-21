import { World } from "../game-objects/world";

export interface CommandParms {
  elapsedMs?: number,
  world?: World,
}
