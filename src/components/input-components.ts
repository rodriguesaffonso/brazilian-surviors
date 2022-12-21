import { GameObject } from "../interfaces";
import { CommandParms } from "./params";

export interface InputComponent {
    update(obj?: GameObject, params?: CommandParms): void;
    start(): void;
    stop(): void
}
