import { CombatComponent } from "../../components";
import { GameObject } from "../../interfaces";
import { World } from "../world";

export class PlayerCombatComponent extends CombatComponent {
  public update(obj: GameObject, world?: World): void {}
};