import { IArmy } from "../../rules/army";
import { IStrategy } from "../../rules/strategy";

export class RandomStrategy implements IStrategy {
  chooseTarget(armies: IArmy[]): IArmy {
    if (armies.length < 1) {
      throw new Error("armies.length < 1");
    }
    if (armies.length === 1) {
      return armies[0];
    }

    return armies[Math.floor(Math.random() * armies.length)];
  }
}
