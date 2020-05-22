import { Soldier } from "../../../core/components/soldier/soldier";
import { Squad } from "../../../core/components/squad/squad";
import exp from "constants";
import { Vehicle } from "../../../core/components/vehicle/vehicle";
import { ISoldier } from "../../../core/components/soldier/rules/soldier";
import { IVehicle } from "../../../core/components/vehicle/rules/vehicle";

function getSoldiers(experienceOfOperators: number = 0): Soldier[] {
  let soldiers: Soldier[] = [];

  for (let i = 0; i < 5; i++) {
    let operator = new Soldier(100, 50);

    operator.experience = experienceOfOperators;
    soldiers.push(operator);
  }

  return soldiers;
}

function getVehicle(experienceOfOperators: number = 0): Vehicle {
  let operators: Soldier[] = [];
  for (let i = 0; i < 5; i++) {
    let operator = new Soldier(100, 50);

    operator.experience = experienceOfOperators;
    operators.push(operator);
  }

  return new Vehicle(100, operators, 1000);
}

describe("Test attackProbability for squad", () => {
  const numberForIteration = 100;

  test("with max experience", () => {
    const squad = new Squad("soldier", getSoldiers(50));

    for (let i = 0; i < numberForIteration; i++) {
      const value = squad.attackProbability();
      expect(value).toBe(1);
    }
  });

  test("without experience", () => {
    const squad = new Squad("soldier", getSoldiers());

    for (let i = 0; i < numberForIteration; i++) {
      const value = squad.attackProbability();
      expect(value).toBeGreaterThanOrEqual(0.5);
      expect(value).toBeLessThanOrEqual(1);
    }
  });
});

describe("Test attackDamage for squad", () => {
  test("with max experience", () => {
    const squad = new Squad("soldier", getSoldiers(50));
    expect(squad.attackDamage()).toBeCloseTo(2.5);
  });

  test("without experience", () => {
    const squad = new Squad("soldier", getSoldiers());
    expect(squad.attackDamage()).toBeCloseTo(0.0025);
  });
});

describe("Test takeDamage for squad", () => {
  test("damage for soldiers", () => {
    const squad = new Squad("soldier", getSoldiers());
    squad.takeDamage(100);
    squad.units.forEach((unit) => {
      expect(unit.health).toBe(80);
    });
  });

  test("damage for vehicle", () => {
    const squad = new Squad("soldier", [getVehicle(50)]);
    squad.takeDamage(100);
    const vehicle = <IVehicle>squad.units[0];

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
});
