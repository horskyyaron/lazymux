import type { Session, Project } from "./types";
import sessionsJson from "./mockSessions.json";
import projectsJson from "./mockProjects.json";

const sessions = sessionsJson as Session[];
const projects = projectsJson as Project[];

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const api = {
  async listSessions(): Promise<Session[]> {
    await sleep(150); // fake network delay
    return sessions;
  },

  async listProjects(): Promise<Project[]> {
    await sleep(150);
    return projects;
  },
};
