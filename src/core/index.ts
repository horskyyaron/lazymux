import type { Session, Project } from "./types";
import sessionsJson from "../data/mockSessions.json";
import projectsJson from "../data/mockProjects.json";

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
