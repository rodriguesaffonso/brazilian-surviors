import { IComponentRunner } from "../components/IComponentRunner";
import { GameObject } from "./GameObject";

export interface IGameObjectList extends IComponentRunner {
    add(object: GameObject): void;
    remove(object: GameObject): void;
    list(): GameObject[];
    contains(object: GameObject): boolean;
}
