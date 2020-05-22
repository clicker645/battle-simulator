import { ISoldier } from "./rules/soldier";
import { Unit } from "../unit/unit";

const MaxExperience = 50;

export class Soldier extends Unit implements ISoldier {
  private experience: number = 0;

  constructor(health: number, recharge: number) {
    super(health, recharge);
  }

  experienceIncrement(): void {
    if (this.experience < MaxExperience) {
      this.experience++;
    }
  }

  getExperience(): number {
    return this.experience;
  }

  attackProbability(): number {
    let attackProbability: number = 0;
    if (this.readyToAttack()) {
      const min = Math.ceil(50 + this.experience);
      const max = Math.floor(100);

      attackProbability =
        (0.5 *
          (1 + this.health / 100) *
          (Math.floor(Math.random() * (max - min + 1)) + min)) /
        100;
    }

    return attackProbability;
  }

  attackDamage(): number {
    let damage: number = 0;
    if (this.readyToAttack()) {
      damage = (0.05 + this.experience) / 100;

      this.experienceIncrement();
      this.toRecharge();
    }

    return damage;
  }

  takeDamage(damage: number): void {
    this.health -= damage;
  }

  alive(): boolean {
    return this.health > 0;
  }
}
