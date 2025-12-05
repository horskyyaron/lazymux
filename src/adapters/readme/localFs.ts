import type { promises } from "dns";
import { promises as fs } from "fs";
import path from "path";
import type { Project, Session } from "../../data/types";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getReadme(source: Project | Session): Promise<string> {
  await sleep(150);
  return `# ${source.name}\n\n* some text\n## Hello`;
}
