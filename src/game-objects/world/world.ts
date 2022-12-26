import { CommandParms } from "../../components";
import { GameObject, GameObjectKind, ObjectComponents } from "../../utils";
import { Camera } from "../camera";
import { WorldGraphicComponent } from "./world-graphic-components";

export class World extends GameObject {
    public enemies: GameObject[] = [];

    constructor(components: ObjectComponents) {
        super({ graphic: components.graphic }, GameObjectKind.World);
        this.enemies = [];
    }

    public update(params: CommandParms): void {
        super.update(params);
        this.removeDeadObjects();
    }

    public addEnemy(enemy: GameObject): void {
        this.enemies.push(enemy);
    }

    private removeDeadObjects(): void {
        this.enemies.forEach((enemy, index) => {
            if (enemy.combatComponent.dead) {
                this.enemies.splice(index, 1);
            }
        });
    }
}

export function createWorld(ctx: CanvasRenderingContext2D, camera: Camera): World {
    return new World({
        graphic: new WorldGraphicComponent(ctx, camera)
    });
}