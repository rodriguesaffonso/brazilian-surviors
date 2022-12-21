import { GameObject, GameObjectKind, ObjectComponents } from "../../interfaces";
import { Camera } from "../camera";
import { Gun } from "../gun";
import { World } from "../world";


export class Bullet extends GameObject {
    public enemy: GameObject;
    public gun: Gun;
    public camera: Camera;
    public world: World;

    constructor(camera: Camera, world: World, gun: Gun, components: ObjectComponents) {
        super({ 
            physics: components.physics,
            combat: components.combat,
            graphic: components.graphic,
        }, GameObjectKind.Bullet);

        this.camera = camera;
        this.world = world;
        this.gun = gun;
    }
}