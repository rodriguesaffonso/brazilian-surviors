import { IComponentUpdateParams } from "./IComponentUpdateParams";

export interface IComponentRunner {
    update(params: IComponentUpdateParams): void;
}
