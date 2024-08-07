import { GameObject } from "../utils";
import { CommandParms, Component } from "./interfaces";

export abstract class InputComponent implements Component {
    public update(obj?: GameObject, params?: CommandParms): void {
        throw Error('NYI');
    }
    public reset(): void {
        throw Error('NYI');
    }
    public start(): void {
        throw Error('NYI');
    }
    public stop(): void {
        throw Error('NYI');
    }
}
