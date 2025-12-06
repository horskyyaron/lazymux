import type { Project, SelectableItem, Session } from "../data/types";

export const sessionToSelectable = (s: Session): SelectableItem => ({
  kind: "session",
  ...s,
});

export const projectToSelectable = (p: Project): SelectableItem => ({
  kind: "project",
  ...p,
});
