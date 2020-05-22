export interface IUnitActions {
  attackProbability(): number;
  takeDamage(damage: number): void;
  alive(): boolean;
  attackDamage(): number;
  getHealth(): number;
}
