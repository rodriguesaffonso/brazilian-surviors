
import { CombatComponent } from "../components/combat-component";
import { GraphicComponent } from "../components/graphic-components";
import { InputComponent } from "../components/input-components";
import { PhysicsComponent } from "../components/physics-components";
import { Vector2D } from "./vector2D";

export enum GameObjectKind {
    Game = 'game',
    World = 'world',
    Player = 'player',
    Camera = 'camera',
    Triangle = 'triangle',
    Gun = 'gun',
    Bullet = 'bullet'
}

export interface CombatComponentParams {
    kind?: GameObjectKind,
    dead?: boolean,
    damage?: number,
    hp?: number,
    maxHp?: number,
}

export interface ObjectComponents {
    input?: InputComponent;
    combat?: CombatComponent;
    physics?: PhysicsComponent;
    graphic?: GraphicComponent;
}

export abstract class GameObject {
    public kind: GameObjectKind;
    
    public inputComponent: InputComponent;
    public combatComponent: CombatComponent;
    public physicsComponent: PhysicsComponent;
    public graphicComponent: GraphicComponent;

    constructor(components: ObjectComponents, kind: GameObjectKind) {
        this.kind = kind;
        this.inputComponent = components.input;
        this.combatComponent = components.combat;
        this.physicsComponent = components.physics;
        this.graphicComponent = components.graphic;

        if (components.input) {
            components.input.start();
        }
    }

    public update(): void {
        this.inputComponent?.update(this);
        this.combatComponent?.update(this);
        this.physicsComponent?.update(this);
        this.graphicComponent?.update(this);
    }

    public getPosition(): Vector2D {
        if (!this.physicsComponent) {
            throw Error(`Missing physics component in ${this.kind}`);
        }
        return this.physicsComponent.position;
    }
}