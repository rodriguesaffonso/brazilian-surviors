
import { CombatComponent, CommandParms, GraphicComponent, InputComponent, PhysicsComponent } from "../components";
import { ColliderComponent } from "../components/collider-components";
import { Observer } from "./observer";
import { Vector2D } from "./vector2D";

// The order in this enum matter as how the game process its objects,
// so the player and its weapons needs to be updated before the enemies
export enum GameObjectKind {
    // Global game objects
    Game = 1,
    World,
    Camera,
    SkillTree,

    // Player objects
    Player,
    MagicPistol,
    MagicPistolBullet,

    // Collectables
    Gem,

    // Enemies objects
    Triangle,
}

export enum ObjectDirection {
    Left = 0,
    Right = 1
}

export interface CombatComponentParams {
    kind?: GameObjectKind,
    dead?: boolean,
    damage?: number,
    hp?: number,
    maxHp?: number,
    cooldown?: number,
    duration?: number,
    amount?: number,
    healthRegen?: number,
    piercingCount?: number
}

export interface PhysicsComponentParams {
    position?: Vector2D;
    velocity?: Vector2D;
    speed?: number;
    direction?: ObjectDirection;
    radiusToPlayer?: number;
    mass?: number;
}

export interface ColliderComponentParams {
    radius: number;
    physics: PhysicsComponent;
}

export interface ObjectComponents {
    input?: InputComponent;
    combat?: CombatComponent;
    physics?: PhysicsComponent;
    graphic?: GraphicComponent;
    collider?: ColliderComponent;
}

export abstract class GameObject extends Observer {
    public kind: GameObjectKind;

    public inputComponent: InputComponent;
    public combatComponent: CombatComponent;
    public physicsComponent: PhysicsComponent;
    public graphicComponent: GraphicComponent;
    public colliderComponent: ColliderComponent;

    constructor(components: ObjectComponents, kind: GameObjectKind) {
        super();
        this.kind = kind;
        this.inputComponent = components.input;
        this.combatComponent = components.combat;
        this.physicsComponent = components.physics;
        this.graphicComponent = components.graphic;
        this.colliderComponent = components.collider;
    }

    public update(params: CommandParms): void {
        if (!params.elapsedMs) throw Error(`Missing elapsedMs in update command of GameObject`);

        this.inputComponent?.update(this, params);
        this.combatComponent?.update(this, params);
        this.colliderComponent?.update(this, params);
        this.physicsComponent?.update(this, params);
        this.graphicComponent?.update(this, params);
    }

    public getPosition(): Vector2D {
        if (!this.physicsComponent) {
            throw Error(`Missing physics component in ${this.kind}`);
        }
        return this.physicsComponent.position;
    }
}