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

    public momentumCollision(me: GameObject, other: GameObject): { meV: Vector2D, otherV: Vector2D } {
        const c1 = me.colliderComponent.collider();
        const c2 = other.colliderComponent.collider();

        const d = c1.p.sub(c2.p);
        const vrel = c1.v.sub(c2.v);
        const projVrelOverD = vrel.projOver(d);
        const km = 2 / (c1.m + c2.m);

        const u1 = c1.v.sub(projVrelOverD.multiply(c1.m * km));
        const u2 = c2.v.add(projVrelOverD.multiply(c2.m * km));

        return { meV: u1, otherV: u2 };
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
