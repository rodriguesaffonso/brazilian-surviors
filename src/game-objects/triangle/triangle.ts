import { CombatComponent, GraphicComponent, PhysicsComponent } from "../../components";
import { GameObject, GameObjectKind, ObjectComponents, Vector2D } from "../../interfaces";
import { Camera } from "../camera";
import { Player } from "../player";

export class Triangle extends GameObject {
    public player: Player;
    public camera: Camera;

    constructor(player: Player, camera: Camera, components: ObjectComponents) {
        super({ 
            physics: components.physics, 
            combat: components.combat, 
            graphic: components.graphic, 
        }, GameObjectKind.Triangle);

        this.player = player;
        this.camera = camera;
    }
}