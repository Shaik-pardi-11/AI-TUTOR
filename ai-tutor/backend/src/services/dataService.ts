import fs from "fs/promises";
import path from "path";

const dataDir = path.join(__dirname, "../../data");

export async function readJson(filename: string) {
  const filePath = path.join(dataDir, filename);
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

export async function writeJson(filename: string, data: any) {
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
