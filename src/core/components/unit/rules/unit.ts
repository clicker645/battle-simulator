import { IUnitActions } from "./unit-actions";

export interface IUnit extends IUnitActions {
  recharge: number;
  health: number;
}
