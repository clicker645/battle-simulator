import { IUnit } from "../../unit/rules/unit";
import { IUnitActions } from "../../unit/rules/unit-actions";

export interface ISquad extends IUnitActions {
  units: IUnit[];
  type: string;
}
