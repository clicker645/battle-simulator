import { IArmy } from "./rules/army";
import { ISquad } from "../squad/rules/squad";
import { IStrategy } from "./rules/strategy";
import { Length } from "class-validator";

export class Army implements IArmy {
  readonly name: string;

  @Length(2)
  squads: ISquad[];
  strategy: IStrategy;

  constructor(name: string, strategy: IStrategy, squads: ISquad[]) {
    this.name = name;
    this.squads = squads;
    this.strategy = strategy;
  }

  alive(): boolean {
    return this.getHealth() > 0;
  }

  attackDamage(): number {
    let accumulatedOfDamage: number = 0;
    for (let i = 0; i < this.squads.length; i++) {
      accumulatedOfDamage += this.squads[i].attackDamage();
    }

    return accumulatedOfDamage;
  }

  attackProbability(): number {
    let sumAttackProbability: number = 0;

    for (let i = 0; i < this.squads.length; i++) {
      sumAttackProbability += this.squads[i].attackProbability();
    }

    return sumAttackProbability;
  }

  takeDamage(damage: number): void {
    let damagePerUnit: number = damage / this.squads.length;
    for (let i = 0; i < this.squads.length; i++) {
      this.squads[i].takeDamage(damagePerUnit);
    }
  }

  getHealth(): number {
    let sumHealth: number = 0;
    for (let i = 0; i < this.squads.length; i++) {
      sumHealth += this.squads[i].getHealth();
    }

    return sumHealth;
  }
}
