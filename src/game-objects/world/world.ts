
import { GraphicComponent } from "../../components/graphic-components";
import { Camera } from "../camera/camera";
import { AbstractObject, Vector2D } from "../interfaces";
import { WorldGraphicComponent } from "./graphic-components";

const MAX_GRID_SIZE = 1e6;

export class World extends AbstractObject {
    public camera: Camera;
    public enemies: AbstractObject[] = [];
    
    public graphicComponent: GraphicComponent;

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, t: number, graphic: WorldGraphicComponent) {
        super(ctx, Vector2D.zero(), t);
        this.camera = camera;
        this.enemies = [];

        this.graphicComponent = graphic;
    }

    public update(): void {
        this.graphicComponent.update();

        this.removeDeadObjects();
    }

    public addEnemy(enemy: AbstractObject): void {
        this.enemies.push(enemy);
    }

    private removeDeadObjects(): void {
        this.enemies.forEach((enemy, index) => {
            if (enemy.dead) {
                this.enemies.splice(index, 1);
            }
        });
    }
}