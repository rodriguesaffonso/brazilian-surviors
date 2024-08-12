import { IComponentUpdateParams } from "../components/Component";
import { GameObject } from "./GameObject";
import { IGameObjectList } from "./IGameObjectList";

export class GameObjectList implements IGameObjectList {
    private objectsArray: GameObject[] = [];
    private dirty: boolean = false;
    list(): GameObject[] {
        return this.objectsArray;
    }
    update(params: IComponentUpdateParams): void {
        if (this.dirty) {
            this.objectsArray.sort(this.compare);
            this.dirty = false;
        }
        for (const object of this.objectsArray) {
            object.update(params)
        }
    }
    add(object: GameObject): void {
        if (this.contains(object)) {
            throw Error('Object already exists in GameObjectList');
        }
        this.objectsArray.push(object);
        this.dirty = true;
    }
    remove(object: GameObject): void {
        const index = this.find(object);
        if (index === -1) {
            console.log('Object already removed in GameObjectList');
            return;
        }
        this.objectsArray.splice(index, 1);
        this.dirty = true;
    }
    contains(object: GameObject): boolean {
        return this.find(object) !== -1;
    }
    private find(object: GameObject): number {
        return this.objectsArray.indexOf(object);
    }
    private compare(a: GameObject, b: GameObject): number {
        return a.kind < b.kind ? -1 : 1;
    }
}
