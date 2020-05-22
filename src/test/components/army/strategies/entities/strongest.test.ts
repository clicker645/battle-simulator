import { DataReader } from "../../../../../core/utils/reader/rules/armies.reader";
import fs from "fs";
import { StrongestStrategy } from "../../../../../core/components/army/strategy/entities/strongest";
import { ArmyCreator } from "../../../../../core/components/army/factory/armies.factory";

describe("Test Strongest Strategy", () => {
  test("get strongest army", () => {
    let strategy = new StrongestStrategy();
    let data: DataReader = JSON.parse(
      fs
        .readFileSync(__dirname + "/../../../../../../data/data.json")
        .toString()
    );

    let armies = new ArmyCreator(data.armies).factory();

    expect(strategy.chooseTarget(armies).name).toBe("Canada");
  });
});
