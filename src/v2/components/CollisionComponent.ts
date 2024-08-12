import { Events } from "../../utils";
import { GameObject } from "../game-objects/GameObject";
import { Component, IComponentUpdateParams } from "./Component";
import { Shape } from "./Shapes";

export interface CollisionComponentParams {
    shape: Shape
}

export interface CollisionEventParams {
    me: GameObject,
    other: GameObject,
}

export abstract class CollisionComponent extends Component {
    protected shape: Shape;
    constructor(params: CollisionComponentParams) {
        super();
        this.shape = params.shape;
    }
    getShape(): Shape {
        return this.shape;
    }
    update(obj: GameObject, params?: IComponentUpdateParams): void {
        const { objects } = params.game;

        for (const otherObject of objects.list()) {
            if (otherObject === obj) {
                continue;
            }
            const otherCollisionComponent = otherObject.collisionComponent();
            if (otherCollisionComponent === undefined) {
                continue;
            }
            if (this.collide(obj, otherObject)) {
                const eventParams: CollisionEventParams = { me: obj, other: otherObject }
                this.emit(Events.CollisionComponent_Collision, eventParams);
            }
        }
    }
    collide(me: GameObject, other: GameObject): boolean {
        throw new Error('NYI');
    }
}   