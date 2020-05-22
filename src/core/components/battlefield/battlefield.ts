import { IArmy } from "../army/rules/army";
import { IStrategy } from "../army/rules/strategy";

export class Battlefield {
  public armies: IArmy[];

  constructor(armies: IArmy[]) {
    this.armies = armies;
  }

  startBattle(): IArmy {
    let winner: IArmy;
    while (true) {
      if (this.armies.length > 2) {
        let currentArmy = this.armies.shift();
        if (currentArmy) {
          let strategy = <IStrategy>currentArmy.strategy;
          let target = strategy.chooseTarget(this.armies);
          this.fight(currentArmy, target);

          this.armies.push(currentArmy);
        } else {
          throw new RangeError("Impossible to shift array armies");
        }
      }

      if (this.armies.length === 2) {
        const el = this.armies.shift();
        if (el) {
          this.armies.push(el);
        } else {
          throw new RangeError("Impossible to shift array armies");
        }

        this.fight(this.armies[0], this.armies[1]);
      }
      if (this.armies.length === 1) {
        winner = this.armies[0];
        break;
      }
    }

    return winner;
  }

  fight(firstArmy: IArmy, secondArmy: IArmy) {
    if (firstArmy.attackProbability() > secondArmy.attackProbability()) {
      let damage = firstArmy.attackDamage();
      secondArmy.takeDamage(damage);

      if (!secondArmy.alive()) {
        this.armies.splice(this.armies.indexOf(secondArmy), 1);
      }
    }
  }
}
