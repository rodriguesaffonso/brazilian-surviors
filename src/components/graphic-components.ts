import { GameObject } from "../utils";
import { CommandParms, Component } from "./interfaces";

export abstract class GraphicComponent implements Component {
    public ctx: CanvasRenderingContext2D;
    
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public update(obj: GameObject, params?: CommandParms): void {
        throw Error ('NYI');
    }
}

