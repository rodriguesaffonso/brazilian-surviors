import { GameObject, GameObjectKind, ObjectComponents } from "../../interfaces";
import { Camera } from "../camera";
import { PlayerCombatComponent } from "./combat-component";

export class Player extends GameObject {
    public weapons: GameObject[];
    public camera: Camera;
    
    constructor(camera: Camera, components: ObjectComponents) {
        super({
            input: components.input,
            physics: components.physics,
            combat: new PlayerCombatComponent({ hp: 100, maxHp: 100, damage: 0 }),
            graphic: components.graphic
        }, GameObjectKind.Player);

        this.camera = camera;
        this.weapons = [];
    }

    public addWeapon(w: GameObject): Player {
        this.weapons.push(w);
        return this;
    }
}