import { GameObject } from "../utils";
import { CommandParms } from "./params";

export abstract class GraphicComponent {
    public ctx: CanvasRenderingContext2D;
    
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public update(obj: GameObject, params?: CommandParms): void {
        throw Error ('NYI');
    }
}

