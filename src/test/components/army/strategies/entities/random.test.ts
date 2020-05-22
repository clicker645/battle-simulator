import { RandomStrategy } from "../../../../../core/components/army/strategy/entities/random";
import { DataReader } from "../../../../../core/utils/reader/rules/armies.reader";
import fs from "fs";
import { ArmyCreator } from "../../../../../core/components/army/factory/armies.factory";

describe("some test", () => {
  test("get random army", () => {
    let strategy = new RandomStrategy();
    let data: DataReader = JSON.parse(
      fs
        .readFileSync(__dirname + "/../../../../../../data/data.json")
        .toString()
    );

    let armies = new ArmyCreator(data.armies).factory();

    for (let i = 0; i < 20; i++) {
      console.log(strategy.chooseTarget(armies).name);
    }

    expect(2).toBe(2);
  });
});
