import path from "path";
import fs from "fs";

export function storageStatePath(envName: string) {
  return path.resolve(process.cwd(), "artifacts", "auth", `${envName}.storageState.json`);
}

export function storageStateExists(envName: string) {
  return fs.existsSync(storageStatePath(envName));
}
