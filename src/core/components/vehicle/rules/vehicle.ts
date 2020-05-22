import { IUnit } from "../../unit/rules/unit";
import { ISoldier } from "../../soldier/rules/soldier";

export interface IVehicle extends IUnit {
  operators: ISoldier[];
}
