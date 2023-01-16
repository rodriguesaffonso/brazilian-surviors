import { GameCanvas } from "../../../canvas/game";
import { Game } from "../../../game";
import { GameObject, GameObjectKind, ObjectComponents, Vector2D } from "../../../utils";
import { Events } from "../../../utils/observer";
import { MagicPistol } from "../magic-pistol";
import { MagicPistolBulletCombatComponent } from "./magic-pistol-bullet-combat-components";
import { MagicPistolBulletGraphicComponent } from "./magic-pistol-bullet-graphic-components";
import { MagicPistolBulletPhysicsComponent } from "./magic-pistol-bullet-physics-components";

export class MagicPistolBullet extends GameObject {
    public pistol: MagicPistol;
    public bulletDirection: Vector2D;

    constructor(components: ObjectComponents, pistol: MagicPistol, game: Game) {
        super(components, GameObjectKind.MagicPistol);
        this.pistol = pistol;
    }

    public setBulletDirection(enemy: GameObject): void {
        this.physicsComponent.velocity = enemy.getPosition().sub(this.getPosition()).unit().multiply(this.physicsComponent.speed);
    }
}

export function createMagicPistolBullet(pistol: MagicPistol, enemy: GameObject, g: Game): MagicPistolBullet {
    const baseParams = g.upgradeManager.getBaseParams(GameObjectKind.MagicPistolBullet)
    const bullet = new MagicPistolBullet({
        physics: new MagicPistolBulletPhysicsComponent({ position: g.player.getPosition() }),
        combat: new MagicPistolBulletCombatComponent({ piercingCount: baseParams.piercingCount }),
        graphic: new MagicPistolBulletGraphicComponent(GameCanvas.getCanvas().ctx)
    }, pistol, g);

    bullet.setBulletDirection(enemy);

    g.addToObjectsArray(bullet);
    pistol.bullets.push(bullet);

    bullet.on(Events.ObjectDead, () => {
        pistol.bullets.forEach((b, index) => {
            if (b === bullet) {
                pistol.bullets.splice(index, 1);
            }
        });
    });

    return bullet;
}