import { IUnit } from "../../unit/rules/unit";

export interface ISoldier extends IUnit {
  getExperience(): number;
}
