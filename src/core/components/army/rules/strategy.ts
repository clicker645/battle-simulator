import { ISquad } from "../../squad/rules/squad";
import { IArmy } from "./army";

export interface IStrategy {
  chooseTarget(armies: IArmy[]): IArmy;
}
