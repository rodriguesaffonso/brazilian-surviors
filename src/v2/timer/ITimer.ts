import { IComponentRunner } from "../components/IComponentRunner";

export interface ITimer extends IComponentRunner {
    start(): ITimer;
}
