import { Soldier } from "../../../core/components/soldier/soldier";

describe("Function toRecharge()", () => {
  test("start recharge and check recharge end time", () => {
    let solider = new Soldier(100, 50);
    expect(solider.toRecharge()).toBeGreaterThan(Date.now());
  });
});

describe("Function readyToAttack()", () => {
  test("test readyToAttack", () => {
    let solider = new Soldier(100, 50);

    // @ts-ignore
    solider.rechargeEnd -= 1;

    expect(solider.readyToAttack()).toBeTruthy();
  });
});

describe("Function alive()", () => {
  test("solder alive", () => {
    let solider = new Soldier(100, 50);
    expect(solider.alive()).toBeTruthy();
  });

  test("solder is dead", () => {
    let solider = new Soldier(0, 50);
    expect(solider.alive()).toBeFalsy();
  });
});

describe("Function takeDamage()", () => {
  test("solder take damage", () => {
    const damage = 100,
      solider = new Soldier(200, 50);

    solider.takeDamage(damage);
    expect(solider.getHealth()).toBe(damage);
  });
});

describe("Function attackDamage()", () => {
  test("damage without experience", () => {
    const solider = new Soldier(200, 50);
    expect(solider.attackDamage()).toBe(0.0005);

    // @ts-ignore
    expect(solider.experience).toBe(1);
  });

  test("damage with experience", () => {
    const solider = new Soldier(100, 50);

    // @ts-ignore
    solider.experience = 50;
    expect(solider.attackDamage()).toBe(0.5005);

    // @ts-ignore
    expect(solider.experience).toBe(50);
  });
});

describe("Function attackProbability()", () => {
  test("with max experience", () => {
    const numberForIteration = 100;
    const solider = new Soldier(100, 50);

    // @ts-ignore
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

describe("Function experienceIncrement()", () => {
  const testCases: Array<{
    name: string;
    defaultExperience: number;
    wantExperience: number;
  }> = [
    {
      name: "experience < 50",
      defaultExperience: 20,
      wantExperience: 21,
    },
    {
      name: "experience > 50",
      defaultExperience: 50,
      wantExperience: 50,
    },
  ];

  testCases.forEach((testCase) => {
    test(testCase.name, () => {
      const solider = new Soldier(100, 50);

      // @ts-ignore
      solider.experience = testCase.defaultExperience;
      solider.experienceIncrement();

      // @ts-ignore
      expect(solider.experience).toBe(testCase.wantExperience);
    });
  });
});
