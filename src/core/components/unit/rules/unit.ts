import { IUnitActions } from "./unit-actions";

export interface IUnit extends IUnitActions {
  readonly recharge: number;
  health: number;
}
