import {
  SelectableItemsTypes,
  type Project,
  type SelectableItem,
  type Session,
} from "../data/types";

export const sessionToSelectable = (s: Session): SelectableItem => ({
  kind: SelectableItemsTypes.SESSION,
  data: s,
});

export const projectToSelectable = (p: Project): SelectableItem => ({
  kind: SelectableItemsTypes.PROJECT,
  data: p,
});
