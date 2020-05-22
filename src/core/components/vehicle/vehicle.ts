import { IVehicle } from "./rules/vehicle";
import { ISoldier } from "../soldier/rules/soldier";
import { Unit } from "../unit/unit";
import { Length } from "class-validator";

const DamageWeightForVehicle = 0.6;
const DamageWeightForRandomSolder = 0.2;
const DamageWeightForAnotherSolders = 0.1;

export class Vehicle extends Unit implements IVehicle {
  @Length(1, 3)
  operators: ISoldier[];

  constructor(health: number, operators: ISoldier[], recharge: number) {
    super(health, recharge);
    this.operators = operators;
  }

  attackProbability(): number {
    let probability: number = 0;
    let sumProbability: number = 0;

    this.operators.forEach((solider) => {
      sumProbability += solider.attackProbability();
    });

    probability =
      0.5 * (1 + this.health / 100) * (sumProbability / this.operators.length);

    return probability;
  }

  attackDamage(): number {
    let damage: number = 0;
    if (this.readyToAttack()) {
      let sumExperience: number = 0;
      this.operators.forEach((solider) => {
        sumExperience += solider.getExperience();
      });

      this.toRecharge();

      damage = 0.1 + sumExperience / 100;
    }

    return damage;
  }

  takeDamage(damage: number) {
    this.health -= damage * DamageWeightForVehicle;

    const minIndex = Math.ceil(0),
      maxIndex = Math.floor(this.operators.length),
      randomIndex =
        Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

    for (let i = 0; i < this.operators.length; i++) {
      if (i === randomIndex) {
        this.operators[i].takeDamage(damage * DamageWeightForRandomSolder);
        continue;
      }

      this.operators[i].takeDamage(damage * DamageWeightForAnotherSolders);
    }
  }

  alive(): boolean {
    if (this.health > 0) {
      for (let i = 0; i < this.operators.length; i++) {
        if (this.operators[i].alive()) {
          return true;
        }
      }
    }

    return false;
  }
}
