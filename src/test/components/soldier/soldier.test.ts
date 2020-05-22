import { Soldier } from "../../../core/components/soldier/soldier";

describe("Test functions for class Solder:", () => {
  test("test toRecharge", () => {
    let solider = new Soldier(100, 50);
    expect(solider.toRecharge()).toBeGreaterThan(new Date().getMilliseconds());
  });

  test("test readyToAttack", () => {
    let solider = new Soldier(100, 50);
    solider.rechargeEnd -= 1;

    expect(solider.readyToAttack()).toBeTruthy();
  });
});

describe("Test alive function", () => {
  test("solder alive", () => {
    let solider = new Soldier(100, 50);
    expect(solider.alive()).toBeTruthy();
  });

  test("solder is dead", () => {
    let solider = new Soldier(0, 50);
    expect(solider.alive()).toBeFalsy();
  });
});

describe("Test takeDamage", () => {
  test("solder take damage", () => {
    const damage = 100,
      solider = new Soldier(200, 50);

    solider.takeDamage(100);
    expect(solider.getHealth()).toBe(100);
  });
});

describe("Test attackDamage", () => {
  test("damage without experience", () => {
    const solider = new Soldier(200, 50);
    expect(solider.attackDamage()).toBe(0.0005);

    expect(solider.experience).toBe(1);
  });

  test("damage with experience", () => {
    const solider = new Soldier(100, 50);
    solider.experience = 50;
    expect(solider.attackDamage()).toBe(0.5005);

    expect(solider.experience).toBe(50);
  });
});

describe("Test attackProbability", () => {
  test("with max experience", () => {
    const numberForIteration = 100;
    const solider = new Soldier(100, 50);
    solider.experience = 50;

    for (let i = 0; i < numberForIteration; i++) {
      const value = solider.attackProbability();
      expect(value).toBe(1);
    }
  });

  test("without experience", () => {
    const numberForIteration = 100;
    const solider = new Soldier(100, 50);

    for (let i = 0; i < numberForIteration; i++) {
      const value = solider.attackProbability();
      expect(value).toBeGreaterThanOrEqual(0.5);
      expect(value).toBeLessThanOrEqual(1);
    }
  });
});
