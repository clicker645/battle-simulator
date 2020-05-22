import { validateSync } from "class-validator";
import { Creator } from "../../../factory/creator";
import { IArmy } from "../rules/army";
import { Army } from "../army";
import { Squad } from "../../squad/squad";
import { StrategyCreator } from "../strategy/creator";
import { IStrategy } from "../rules/strategy";
import { SquadsCreator } from "../../squad/factory/squads.factory";

export class ArmyCreator extends Creator<IArmy[]> {
  constructor(armies: IArmy[]) {
    super(armies);
  }
  factory(): IArmy[] {
    let armies: Army[] = [];

    this.item.forEach((army: IArmy) => {
      let squads: Squad[] = new SquadsCreator(army.squads).factory();
      if (typeof army.strategy === "string") {
        const strategyCreator = new StrategyCreator(army.strategy);
        const error = validateSync(strategyCreator);
        if (error.length > 0) {
          throw new Error(error.toString());
        }

        const strategy = strategyCreator.getStrategy();
        if (!strategy) {
          throw new Error(`Strategy ${strategyCreator.strategy} not found`);
        }

        armies.push(new Army(army.name, <IStrategy>strategy, squads));
      } else {
        throw new TypeError("Strategy type isn't string");
      }
    });

    return armies;
  }
}
