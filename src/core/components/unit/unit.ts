import { IUnit } from "./rules/unit";
import { Min, Max } from "class-validator";

export abstract class Unit implements IUnit {
  @Min(0)
  @Max(100)
  health: number;

  @Min(100, { groups: ["soldier"] })
  @Min(1000, { groups: ["vehicle"] })
  @Max(2000)
  recharge: number;

  rechargeEnd: number;

  /**
   * @param health
   * @param recharge
   */
  protected constructor(health: number, recharge: number) {
    this.health = health;
    this.recharge = recharge;
    this.rechargeEnd = Date.now();
  }

  public readyToAttack(): boolean {
    return this.rechargeEnd <= Date.now() + this.recharge;
  }

  public toRecharge(): number {
    this.rechargeEnd = Date.now() + this.recharge;

    return this.rechargeEnd;
  }

  getHealth(): number {
    return this.health;
  }

  abstract takeDamage(damage: number): void;

  abstract attackProbability(): number;

  abstract attackDamage(): number;

  abstract alive(): boolean;
}
