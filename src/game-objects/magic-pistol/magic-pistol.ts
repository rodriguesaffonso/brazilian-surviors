import { Game } from "../../game";
import { GameObject, GameObjectKind, ObjectComponents } from "../../interfaces";
import { Player } from "../player";
import { World } from "../world";
import { MagicPistolBullet } from "./magic-pistol-bullet";
import { MagicPistolCombatComponent } from "./magic-pistol-combat-components";

export class MagicPistol extends GameObject {
    public bullets: MagicPistolBullet[];

    public world: World;
    public player: Player;

    constructor(components: ObjectComponents, game: Game) {
        super(components, GameObjectKind.MagicPistol);
        this.bullets = [];
        this.world = game.world;
        this.player = game.player;
    }
}

export function createMagicPistol(g: Game): MagicPistol {
    return new MagicPistol({ 
        combat: new MagicPistolCombatComponent() 
    }, g);
}