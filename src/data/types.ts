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
  | {
      kind: SelectableItemsTypes.SESSION;
      data: Session;
    }
  | {
      kind: SelectableItemsTypes.PROJECT;
      data: Project;
    };

export enum SelectableItemsTypes {
  SESSION = "session",
  PROJECT = "project",
}

export enum Tabs {
  SESSIONS = "sessions",
  PROJECTS = "projects",
  README = "readme",
}

export type SectionType = Exclude<Tabs, Tabs.README>;

export type ListSection = {
  sectionTabName: string;
  sectionType: SectionType;
  data: SelectableItem[];
};
