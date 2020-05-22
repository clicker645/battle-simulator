import { ISquad } from "../../squad/rules/squad";
import { IStrategy } from "./strategy";
import { IUnitActions } from "../../unit/rules/unit-actions";

export interface IArmy extends IUnitActions {
  squads: ISquad[];
  strategy: IStrategy | string;
  readonly name: string;
}
