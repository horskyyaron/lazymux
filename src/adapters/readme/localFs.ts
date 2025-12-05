import type { promises } from "dns";
import { promises as fs } from "fs";
import path from "path";
import type { Project, Session } from "../../data/types";

const possibleNames = ["README.md", "readme.md", "Readme.md", "README"];

export async function getReadme(source: Project | Session): Promise<string> {
  console.log("in  reademe local", source);
  for (const name of possibleNames) {
    const full = path.join(source.path, name);
    try {
      return await fs.readFile(full, "utf8");
    } catch {}
  }

  return `# ${source.name}\n\n_No README found in this project._`;
}
