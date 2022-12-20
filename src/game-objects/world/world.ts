import { GameObject, GameObjectKind, ObjectComponents } from "../../interfaces";

export class World extends GameObject {
    public enemies: GameObject[] = [];

    constructor(components: ObjectComponents) {
        super({ graphic: components.graphic }, GameObjectKind.World);
        this.enemies = [];
    }

    public update(): void {
        this.graphicComponent.update();
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