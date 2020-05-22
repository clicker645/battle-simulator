import { Vehicle } from "../../../core/components/vehicle/vehicle";
import { Soldier } from "../../../core/components/soldier/soldier";
import { ISoldier } from "../../../core/components/soldier/rules/soldier";

function getVehicle(experienceOfOperators: number = 0): Vehicle {
  let operators: Soldier[] = [];
  for (let i = 0; i < 5; i++) {
    let operator = new Soldier(100, 50);

    operator.experience = experienceOfOperators;
    operators.push(operator);
  }

  return new Vehicle(100, operators, 1000);
}

describe("Test attackProbability", () => {
  test("operators without experience", () => {
    const numberForIteration = 100;

    let vehicle = getVehicle();
    for (let i = 0; i < numberForIteration; i++) {
      const value: number = vehicle.attackProbability();
      expect(value).toBeGreaterThanOrEqual(0.5);
      expect(value).toBeLessThanOrEqual(1);
    }
  });

  test("operators with max experience", () => {
    const numberForIteration = 100;

    let vehicle = getVehicle(50);
    for (let i = 0; i < numberForIteration; i++) {
      const value: number = vehicle.attackProbability();
      expect(value).toBe(1);
    }
  });
});

describe("Test attackDamage", () => {
  test("operators without experience", () => {
    let vehicle = getVehicle();
    expect(vehicle.attackDamage()).toBe(0.1);
  });

  test("operators with max experience", () => {
    let vehicle = getVehicle(50);
    expect(vehicle.attackDamage()).toBe(2.6);
  });
});

test("Test default case fot takeDamage", () => {
  let vehicle = getVehicle();
  vehicle.takeDamage(100);

  expect(vehicle.getHealth()).toBe(40);

  let operatorWithMaxHealth = vehicle.operators.reduce(
    (prev: ISoldier, current: ISoldier) =>
      current.health > prev.health ? current : prev
  );

  let operatorWithMinHealth = vehicle.operators.reduce(
    (prev: ISoldier, current: ISoldier) =>
      current.health < prev.health ? current : prev
  );

  expect(operatorWithMaxHealth.health).toBe(90);
  expect(operatorWithMinHealth.health).toBe(80);
});

describe("Test alive", () => {
  test("vehicle and operators alive", () => {
    let vehicle = getVehicle();
    expect(vehicle.alive()).toBeTruthy();
  });

  test("vehicle is broken", () => {
    let vehicle = getVehicle();
    vehicle.health = 0;
    expect(vehicle.alive()).toBeFalsy();
  });

  test("all operators are dead", () => {
    let vehicle = getVehicle();
    vehicle.operators.forEach((soldier) => {
      soldier.health = 0;
    });

    expect(vehicle.alive()).toBeFalsy();
  });

  test("one operator is dead", () => {
    let vehicle = getVehicle();
    vehicle.operators[0].health = 0;

    expect(vehicle.alive()).toBeTruthy();
  });
});
