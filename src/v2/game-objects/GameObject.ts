import { Observer } from "../../utils";
import { CollisionComponent } from "../components/CollisionComponent";
import { CombatComponent } from "../components/CombatComponent";
import { GraphicComponent } from "../components/GraphicComponent";
import { IComponentUpdateParams } from "../components/IComponentUpdateParams";
import { InputComponent } from "../components/InputComponent";
import { ObjectComponents } from "../components/ObjectComponents";
import { PhysicComponent } from "../components/PhysicComponent";
import { GameObjectKind } from "./GameObjectKind";

export abstract class GameObject extends Observer {
    private _kind: GameObjectKind;
    private _inputComponent: InputComponent;
    private _physicComponent: PhysicComponent;
    private _graphicComponent: GraphicComponent;
    private _collisionComponent: CollisionComponent;
    public _combatComponent: CombatComponent;
    // constructor(components: ObjectComponents, kind: GameObjectKind) {
    constructor(components: ObjectComponents, kind: GameObjectKind) {
        super();
        this._kind = kind;
        this._inputComponent = components.input;
        this._physicComponent = components.physic;
        this._graphicComponent = components.graphic;
        this._collisionComponent = components.collision;
        this._combatComponent = components.combat;
    }
    public kind(): GameObjectKind { return this._kind; }

    public update(params: IComponentUpdateParams): void {
        this._inputComponent?.update(this, params);
        this._physicComponent?.update(this, params);
        this._graphicComponent?.update(this, params);
        this._collisionComponent?.update(this, params);
        this._combatComponent?.update(this, params);
    }

    public inputComponent(): InputComponent { return this._inputComponent; }
    public physicComponent(): PhysicComponent { return this._physicComponent; }
    public graphicComponent(): GraphicComponent { return this._graphicComponent; }
    public collisionComponent(): CollisionComponent { return this._collisionComponent; }
    public combatComponent(): CombatComponent { return this._collisionComponent; }
}
