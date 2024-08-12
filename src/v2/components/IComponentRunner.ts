import { IComponentUpdateParams } from "./Component";

export interface IComponentRunner {
    update(params: IComponentUpdateParams): void;
}
