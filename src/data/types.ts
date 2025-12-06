export interface Session {
  id: string;
  name: string;
  path: string;
  isCurrent: boolean;
}

export interface Project {
  id: string;
  name: string;
  path: string;
  source: "local" | "remote";
}

export type SelectableItem =
  | ({ kind: "session" } & Session)
  | ({ kind: "project" } & Project);

export enum Tabs {
  SESSIONS = "sessions",
  PROJECTS = "projects",
  README = "readme",
}
