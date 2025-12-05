import type { promises } from "dns";
import { promises as fs } from "fs";
import path from "path";

import projectsJson from "../../data/mockProjects.json";
import type { Project } from "../../data/types";

const projects = projectsJson as Project[];
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getDirectories(): Promise<Project[]> {
  await sleep(150);
  return projects;
}
