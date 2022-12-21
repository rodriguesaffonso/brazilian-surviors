
import { CommandParms } from "../../components";
import { CombatComponent } from "../../components/combat-component";
import { GameObject } from "../../interfaces";
import { World } from "../world";
import { Gun } from "./gun";

export class GunCombatComponent extends CombatComponent {
    public update(obj: GameObject, params: CommandParms): void {}
}
