import {
  getTmuxSessions,
  killTmuxSession,
  switchTmuxSession,
} from "../adapters/multiplexer/tmux";
import { getProjectsDirectories } from "../adapters/projectProviders/localFs";
import { getReadme } from "../adapters/readme/localFs";
import type { Project, Session } from "../data/types";

export const api = {
  async getSessions(): Promise<Session[]> {
    const sessions = await getTmuxSessions();
    return sessions;
  },

  async getProjects(): Promise<Project[]> {
    const dirs = await getProjectsDirectories();
    return dirs;
  },

  async getProjectReadme(source: Project | Session): Promise<string> {
    const readme = await getReadme(source);
    return readme;
  },

  async killSession(name: string) {
    const result = await killTmuxSession(name);
    return result;
  },

  async switchSession(name: string) {
    const result = await switchTmuxSession(name);
    return result;
  },
};
