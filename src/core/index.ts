import { getTmuxSessions } from "../adapters/multiplexer/tmux";
import { getDirectories } from "../adapters/projectProviders/localFs";
import type { Project, Session } from "../data/types";

export const api = {
  async getSessions(): Promise<Session[]> {
    const sessions = await getTmuxSessions();
    return sessions;
  },

  async getProjects(): Promise<Project[]> {
    const dirs = await getDirectories();
    return dirs;
  },
};
