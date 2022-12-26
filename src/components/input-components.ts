import { GameObject } from "../utils";
import { CommandParms } from "./params";

export abstract class InputComponent {
    public update(obj?: GameObject, params?: CommandParms): void {
        throw Error('NYI');
    }
    public start(): void {
        throw Error('NYI');
    }
    public stop(): void {
        throw Error('NYI');
    }
}
