import { GameObject, GameObjectKind, ObjectComponents } from "../../interfaces";
import { Bullet, BulletCombatComponent, BulletGraphicComponent, BulletPhysicsComponent } from "../bullet";
import { Camera } from "../camera";
import { Player } from "../player";
import { World } from "../world";
import { GunCombatComponent } from "./gun-combat-components";


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

export function createGun(ctx: CanvasRenderingContext2D, camera: Camera, world: World, player: Player, cb: (obj: GameObject) => void): Gun {
    const gun = new Gun(ctx, camera, world, { combat: new GunCombatComponent(ctx, camera, {}) });
    gun.setAddBulletToGameObjectArray(cb);

    player.addWeapon(gun);
    return gun;
}