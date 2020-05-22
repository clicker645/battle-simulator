import { IArmy } from "./army";

export interface IStrategy {
  chooseTarget(armies: IArmy[]): IArmy;
}
