import { IComponentRunner } from "../components/IComponentRunner";
import { GameObject } from "./GameObject";

export interface IGameObjectList extends IComponentRunner {
    add(object: IComponentRunner): void;
    remove(object: IComponentRunner): void;
    list(): GameObject[];
}
