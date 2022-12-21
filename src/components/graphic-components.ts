import { GameObject } from "../interfaces";
import { CommandParms } from "./params";

export interface GraphicComponent {
    update(obj: GameObject, params?: CommandParms): void;
}

