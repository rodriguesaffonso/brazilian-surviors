import { GameObject, GameObjectKind, ObjectComponents } from "../../interfaces";
import { Bullet, BulletCombatComponent, BulletGraphicComponent, BulletPhysicsComponent } from "../bullet";
import { Camera } from "../camera";
import { World } from "../world";


export class Gun extends GameObject {
    public weapons: Bullet[];
    public addBulletToGameObjectArray: (bullet: Bullet) => void;
    public trackingEnemies: Set<GameObject>;

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, world: World, components: ObjectComponents) {
        super({ 
            combat: components.combat 
        }, GameObjectKind.Gun);

        this.weapons = [];
        this.trackingEnemies = new Set();
    }

    public setAddBulletToGameObjectArray(cb: (bullet: Bullet) => void): void {
        this.addBulletToGameObjectArray = cb;
    }
}