import { Battlefield } from "./core/components/battlefield/battlefield";
import { DataReader } from "./core/utils/reader/rules/armies.reader";
import { JsonRead } from "./core/utils/reader/file-reader";
import { ArmyCreator } from "./core/components/army/factory/armies.factory";

const data: DataReader = JsonRead(__dirname + "/../data/data.json");

const armies = new ArmyCreator(data.armies).factory(),
  battlefield = new Battlefield(armies);

const winner = battlefield.startBattle();

console.log(winner.name, winner.getHealth());
