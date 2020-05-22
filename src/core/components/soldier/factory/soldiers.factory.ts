import { Creator } from "../../../factory/creator";
import { ISoldier } from "../rules/soldier";
import { Soldier } from "../soldier";
import { validateSync } from "class-validator";

export class SoldiersCreator extends Creator<ISoldier[]> {
  constructor(soldiers: ISoldier[]) {
    super(soldiers);
  }

  factory(): ISoldier[] {
    let result: Soldier[] = [];

    this.item.forEach((soldiers: ISoldier) => {
      const soldier = new Soldier(soldiers.health, soldiers.recharge);
      // const error = validateSync(soldier, {
      //   groups: ["soldier"]
      // });
      // if (error.length > 0) {
      //   throw new Error(error.toString());
      // }

      result.push(soldier);
    });

    return result;
  }
}
