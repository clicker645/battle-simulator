import fs from "fs";

export function JsonRead(path: string): any {
  return JSON.parse(fs.readFileSync(path).toString());
}
