import { IArmy } from "../../rules/army";
import { IStrategy } from "../../rules/strategy";

export class WeakestStrategy implements IStrategy {
  chooseTarget(armies: IArmy[]): IArmy {
    if (armies.length < 1) {
      throw new Error("armies.length < 1");
    }
    if (armies.length === 1) {
      return armies[0];
    }

    let maxHealth = armies[0].getHealth();
    let targetIndex: number = 0;

    for (let i = 0; i < armies.length; i++) {
      let currentHealth = armies[i].getHealth();
      if (currentHealth < maxHealth) {
        maxHealth = currentHealth;
        targetIndex = i;
      }
    }

    return armies[targetIndex];
  }
}
