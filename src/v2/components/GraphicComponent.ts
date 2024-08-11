import { Observer } from "../../utils";
import { GameObject } from "../game-objects/GameObject";
import { Component } from "./Component";
import { IComponentUpdateParams } from "./IComponentUpdateParams";

export interface GraphicComponentParams {
    ctx: CanvasRenderingContext2D;
}

export abstract class GraphicComponent extends Observer implements Component  {    
    protected ctx: CanvasRenderingContext2D;
    constructor(params: GraphicComponentParams) {
        super();
        this.ctx = params.ctx;
    }
    public update(obj: GameObject, params?: IComponentUpdateParams): void {
        throw Error('NYI');
    }
}