import { IComponentUpdateParams } from "../components/IComponentUpdateParams";
import { GameObject } from "./GameObject";
import { IGameObjectList } from "./IGameObjectList";

export class GameObjectList implements IGameObjectList {
    list(): GameObject[] {
        return this.objectsArray;
    }
    private objectsArray: GameObject[] = [];
    update(params: IComponentUpdateParams): void {
        for (const object of this.objectsArray) {
            object.update(params)
        }
    }
    add(object: GameObject): void {
        if (this.find(object) !== -1) {
            throw Error('Object already exists in GameObjectList');
        }
        this.objectsArray.push(object);
    }
    remove(object: GameObject): void {
        const index = this.find(object);
        if (index === -1) {
            console.log('Object already exists in GameObjectList');
            return;
        }
        this.objectsArray.splice(index, 1);
    }
    private find(object: GameObject): number {
        return this.objectsArray.indexOf(object);
    }
}
