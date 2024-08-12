import { GameObject } from "../game-objects/GameObject";
import { Component, IComponentUpdateParams } from "./Component";

export interface GraphicComponentParams {
    ctx: CanvasRenderingContext2D;
}

export abstract class GraphicComponent extends Component  {    
    protected ctx: CanvasRenderingContext2D;
    constructor(params: GraphicComponentParams) {
        super();
        this.ctx = params.ctx;
    }
    public update(obj: GameObject, params?: IComponentUpdateParams): void {
        throw Error('NYI');
    }
}