import { IGame } from "../game/IGame";

export interface IComponentUpdateParams {
    timestamp: number;
    game: IGame;
}
