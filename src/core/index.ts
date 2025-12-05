import { getDirectories } from "../adapters/projectProviders/localFs";
import sessionsJson from "../data/mockSessions.json";
import type { Project, Session } from "../data/types";

const sessions = sessionsJson as Session[];
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const api = {
  async listSessions(): Promise<Session[]> {
    await sleep(150); // fake network delay
    return sessions;
  },

  async getProjects(): Promise<Project[]> {
    const dirs = await getDirectories();
    return dirs;
  },
};
