import { Creator } from "../../../factory/creator";
import { ISquad } from "../rules/squad";
import { Squad } from "../squad";
import { IVehicle } from "../../vehicle/rules/vehicle";
import { ISoldier } from "../../soldier/rules/soldier";
import { VehicleCreator } from "../../vehicle/factory/vehicles.facrory";
import { SoldiersCreator } from "../../soldier/factory/soldiers.factory";
import { IUnit } from "../../unit/rules/unit";
import { validateSync } from "class-validator";

declare type selectUnitsType = (units: IUnit[]) => IUnit[];

const concreteUnitsType: { [key: string]: selectUnitsType } = {
  vehicles: (units: IUnit[]) => new VehicleCreator(<IVehicle[]>units).factory(),
  soldiers: (units: IUnit[]) =>
    new SoldiersCreator(<ISoldier[]>units).factory(),
};

export class SquadsCreator extends Creator<ISquad[]> {
  constructor(squads: ISquad[]) {
    super(squads);
  }

  factory(): ISquad[] {
    let result: Squad[] = [];
    this.item.forEach((squad: ISquad) => {
      const units = concreteUnitsType[squad.type](squad.units);
      const newSquad = new Squad(squad.type, units),
        error = validateSync(squad);
      if (error.length > 0) {
        throw new Error(error.toString());
      }

      result.push(newSquad);
    });

    return result;
  }
}
