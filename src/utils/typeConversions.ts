import type { SelectOption } from "@opentui/core";
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

export const converSelectableItemToSelectOption = (
  item: SelectableItem,
): SelectOption => {
  return {
    name:
      item.kind === SelectableItemsTypes.SESSION && item.data.isCurrent
        ? `🟢 ${item.data.name} (attached)`
        : item.data.name,
    description: "",
    value: item,
  };
};
