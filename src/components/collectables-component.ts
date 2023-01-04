import { GameObject } from "../utils";
import { CommandParms, Component } from "./interfaces";

export abstract class CollectableCompoment implements Component {
    public probToGenerate: number;

    constructor(p: number) {
        this.probToGenerate = Math.min(Math.max(0, p), 1);
    }

    public update(obj: GameObject, params?: CommandParms): void {
        throw Error ('NYI');
    }

    public canGenerateCollectables(): boolean {
        return Math.random() <= this.probToGenerate;
    }
}

