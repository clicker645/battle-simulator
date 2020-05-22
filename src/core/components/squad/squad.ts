import { ISquad } from "./rules/squad";
import { IUnit } from "../unit/rules/unit";
import { IsIn, Length } from "class-validator";

export class Squad implements ISquad {
  @IsIn(["soldier", "vehicle"])
  readonly type: string;

  @Length(5, 10)
  units: IUnit[];

  constructor(type: string, units: IUnit[]) {
    this.type = type;
    this.units = units;
  }

  attackProbability(): number {
    let numberOfUnits: number = this.units.length;
    let mulAttackProbability: number = 1;

    this.units.forEach((unit) => {
      mulAttackProbability *= unit.attackProbability();
    });

    return Math.pow(mulAttackProbability, 1 / numberOfUnits);
  }

  takeDamage(damage: number): void {
    let damagePerUnit: number = damage / this.units.length;
    for (let i = 0; i < this.units.length; i++) {
      this.units[i].takeDamage(damagePerUnit);
    }
  }

  attackDamage(): number {
    let accumulatedOfDamage: number = 0;
    this.units.forEach((unit) => {
      accumulatedOfDamage += unit.attackDamage();
    });

    return accumulatedOfDamage;
  }

  alive(): boolean {
    for (let i = 0; i < this.units.length; i++) {
      if (this.units[i].alive()) {
        return true;
      }
    }

    return false;
  }

  getHealth(): number {
    let sumHealth: number = 0;
    this.units.forEach((unit: IUnit) => {
      sumHealth += unit.getHealth();
    });

    return sumHealth;
  }
}
