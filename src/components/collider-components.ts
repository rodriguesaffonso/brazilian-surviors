import { ColliderComponentParams, GameObject, ObjectDirection, PhysicsComponentParams, Vector2D } from "../utils";
import { CommandParms, Component } from "./interfaces";
import { PhysicsComponent } from "./physics-components";

export interface Collider2D {
    r?: number, // radius/size 
    m?: number, // mass
    p?: Vector2D, // position
    v?: Vector2D // velocity
}

export abstract class ColliderComponent implements Component {
    public radius: number;
    private physicsComponent: PhysicsComponent;

    constructor(params: ColliderComponentParams) {
        this.physicsComponent = params.physics;
        this.radius = params.radius;
    }

    public update(obj: GameObject, params?: CommandParms): void {
        throw Error('NYI');
    }

    public colliding(me: GameObject, other: GameObject): boolean {
        const c1 = me.colliderComponent.collider();
        const c2 = other.colliderComponent.collider();
        const d = c1.p.sub(c2.p).modulo();
        
        return c1.r + c2.r > d;
    }

    private collider(): Collider2D {
        return {
            r: this.radius,
            m: this.physicsComponent.mass,
            p: this.physicsComponent.position.copy(),
            v: this.physicsComponent.velocity.copy()
        }
    }
}
