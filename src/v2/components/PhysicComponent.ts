import { Observer, Vector2D } from "../../utils";
import { GameObject } from "../game-objects/GameObject";
import { Component } from "./Component";
import { IComponentUpdateParams } from "./IComponentUpdateParams";

export interface PhysicComponentParams {
    velocity?: Vector2D;
    position?: Vector2D;
    speed?: number;
}

export abstract class PhysicComponent extends Observer implements Component  {    
    protected speed: number;
    protected velocity: Vector2D;
    protected position: Vector2D;
    constructor(params: PhysicComponentParams) {
        super();
        this.speed = params.speed ?? 0;
        this.velocity = params.velocity ?? Vector2D.zero();
        this.position = params.position ?? Vector2D.zero(); 
    }
    update(obj: GameObject, params?: IComponentUpdateParams): void {
        this.position = this.position.add(this.velocity.multiply(params.game.clock.elapsed() / 1000));
    }
    public getPosition(): Vector2D {
        return this.position;
    }
}