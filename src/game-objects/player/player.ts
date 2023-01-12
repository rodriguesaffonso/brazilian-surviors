import { UpgradeManager } from "../../components/upgrade-manager/upgrade-manager";
import { GameObject, GameObjectKind, ObjectComponents } from "../../utils";
import { Camera } from "../camera";
import { PlayerCombatComponent } from "./player-combat-component";
import { PlayerGraphicComponent } from "./player-graphic-components";
import { PlayerInputComponent } from "./player-input-components";
import { PlayerPhysicsComponent } from "./player-physics-components";

export class Player extends GameObject {
    public weapons: GameObject[];
    public camera: Camera;
    
    constructor(camera: Camera, components: ObjectComponents) {
        super(components, GameObjectKind.Player);

        this.camera = camera;
        this.weapons = [];
    }

    public addWeapon(w: GameObject): Player {
        this.weapons.push(w);
        return this;
    }

    public isMoving(): boolean {
        return this.physicsComponent.isMoving();
    }
}

export function createPlayer(ctx: CanvasRenderingContext2D, camera: Camera, upgrade: UpgradeManager): Player {
    const baseParams = upgrade.getBaseParams(GameObjectKind.Player);
    const physicsComponent = new PlayerPhysicsComponent();
    return new Player(camera, {
        input: new PlayerInputComponent(physicsComponent),
        physics: physicsComponent,
        graphic: new PlayerGraphicComponent(ctx),
        combat: new PlayerCombatComponent({ healthRegen: baseParams.healthRegen })
    });
}