import { promises as fs } from "fs";
import path from "path";
import type { Project } from "../../data/types";

const PROJECTS_ROOT = "/Users/yaronhorsky/projects/"; // or from config/env

export async function getProjectsDirectories(): Promise<Project[]> {
  const entries = await fs.readdir(PROJECTS_ROOT, { withFileTypes: true });

  const dirs = entries.filter((e) => e.isDirectory());

  return dirs.map((d) => ({
    id: d.name,
    name: d.name,
    path: path.join(PROJECTS_ROOT, d.name),
    source: "local",
  }));
}
