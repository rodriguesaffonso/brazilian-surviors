import { GameObject } from "../game-objects/GameObject";
import { CircleShape } from "./Shapes";

export class CircleCollider {
    collideFromGameObjects(me: GameObject, other: GameObject): boolean {
        const meShape = this.getCircle(me);
        const otherShape = this.getCircle(other);
        return new CircleCollider().collide(meShape, otherShape);
    }
    collide(me: CircleShape, other: CircleShape): boolean {
        const dist = me.getCenter().sub(other.getCenter()).modulo();
        return me.getRadius() + other.getRadius() > dist;
    }
    private getCircle(obj: GameObject): CircleShape {
        const shape = obj.collisionComponent().getShape() as CircleShape;
        shape.setCenter(obj.physicComponent().getPosition());
        return shape;
    }
}
