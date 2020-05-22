import { IStrategy } from "../rules/strategy";
import { WeakestStrategy } from "./entities/weakest";
import { RandomStrategy } from "./entities/random";
import { StrongestStrategy } from "./entities/strongest";
import { IsIn } from "class-validator";

const strategies: { [key: string]: IStrategy } = {
  weakest: new WeakestStrategy(),
  random: new RandomStrategy(),
  strongest: new StrongestStrategy(),
};

export class StrategyCreator {
  @IsIn(["weakest", "random", "strongest"])
  public readonly strategy: string;

  constructor(strategy: string) {
    this.strategy = strategy;
  }

  getStrategy(): IStrategy | null {
    if (this.strategy in strategies) {
      return strategies[this.strategy];
    }

    return null;
  }
}
