import { Player } from "./actors";
import { Camera } from "./camera";
import { GraphicComponent, WorldGraphicComponent } from "./graphic-components";
import { AbstractObject, Vector2D } from "./interfaces";

const MAX_GRID_SIZE = 1e6;

export class World extends AbstractObject {
    public camera: Camera;
    public objects: AbstractObject[];
    public graphicComponent: GraphicComponent;

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, t: number, graphic: WorldGraphicComponent) {
        super(ctx, Vector2D.zero(), t);
        this.camera = camera;
        this.objects = [];

        this.graphicComponent = graphic;
    }

    public update(): void {
        this.graphicComponent.update();

        this.removeDeadObjects();
    }

    public addObject(obj: AbstractObject): void {
        this.objects.push(obj);
    }

    public getPlayer(): Player {
        return this.objects[0] as Player;
    }

    private removeDeadObjects(): void {
        this.objects.forEach((obj, index) => {
            if (obj.dead) {
                this.objects.splice(index, 1);
            }
        });
    }
}