import { Creator } from "../../../factory/creator";
import { IVehicle } from "../rules/vehicle";
import { ISoldier } from "../../soldier/rules/soldier";
import { Vehicle } from "../vehicle";
import { SoldiersCreator } from "../../soldier/factory/soldiers.factory";
import { validateSync } from "class-validator";

export class VehicleCreator extends Creator<IVehicle[]> {
  constructor(vehicles: IVehicle[]) {
    super(vehicles);
  }

  factory(): IVehicle[] {
    let result: IVehicle[] = [],
      operators: ISoldier[] = [];

    this.item.forEach((vehicle: IVehicle) => {
      operators = new SoldiersCreator(vehicle.operators).factory();
      const newVehicle = new Vehicle(
        vehicle.health,
        operators,
        vehicle.recharge
      );
      // const error = validateSync(newVehicle)
      // if (error.length > 0) {
      //     throw new Error(error.toString())
      // }

      result.push(newVehicle);
    });

    return result;
  }
}
