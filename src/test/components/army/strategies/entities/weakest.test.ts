import { DataReader } from "../../../../../core/utils/reader/rules/armies.reader";
import fs from "fs";
import { WeakestStrategy } from "../../../../../core/components/army/strategy/entities/weakest";
import { ArmyCreator } from "../../../../../core/components/army/factory/armies.factory";

describe("Test WeakestStrategy", () => {
  test("get weakest army", () => {
    let strategy = new WeakestStrategy();
    let data: DataReader = JSON.parse(
      fs
        .readFileSync(__dirname + "/../../../../../../data/data.json")
        .toString()
    );

    let armies = new ArmyCreator(data.armies).factory();

    expect(strategy.chooseTarget(armies).name).toBe("France");
  });
});
