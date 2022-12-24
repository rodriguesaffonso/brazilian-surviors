import { Game } from "../../../game";
import { GameObject, GameObjectKind, ObjectComponents } from "../../../interfaces";
import { Events } from "../../../interfaces/observer";
import { MagicPistol } from "../magic-pistol";
import { MagicPistolCombatComponent } from "./magic-pistol-bullet-combat-components";
import { MagicPistolBulletGraphicComponent } from "./magic-pistol-bullet-graphic-components";
import { MagicPistolBulletPhysicsComponent } from "./magic-pistol-bullet-physics-components";

export class MagicPistolBullet extends GameObject {
    public targetEnemy: GameObject;
    
    public pistol: MagicPistol;

    constructor(components: ObjectComponents, pistol: MagicPistol, game: Game) {
        super(components, GameObjectKind.MagicPistol);
        this.pistol = pistol;
    }
}

export function createMagicPistolBullet(pistol: MagicPistol, enemy: GameObject, g: Game): MagicPistolBullet {
    const bullet = new MagicPistolBullet({
        physics: new MagicPistolBulletPhysicsComponent({ position: g.player.getPosition() }),
        combat: new MagicPistolCombatComponent(),
        graphic: new MagicPistolBulletGraphicComponent(g.ctx)
    }, pistol, g);

    if (enemy === undefined) {
        throw Error('undefined enemy');
    }
    
    bullet.targetEnemy = enemy;
    enemy.on(Events.ObjectDead, () => {
        bullet.targetEnemy = undefined;
    });

    g.addToObjectsArray(bullet);
    pistol.bullets.push(bullet);

    bullet.on(Events.ObjectDead, () => {
        g.removeFromObjectsArray(bullet);

        pistol.bullets.forEach((b, index) => {
            if (b === bullet) {
                pistol.bullets.splice(index, 1);
            }
        });
    });

    return bullet;
}