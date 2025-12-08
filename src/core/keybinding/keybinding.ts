import { SelectableItemsTypes, type SelectableItem } from "../../data/types";

export enum Action {
  SESSION_SWITCH_SESSION_CLIENT = "switch-client",
  SESSION_KILL_SESSION = "kill-session",
  SESSION_RENAME_SESSION = "rename-session",
  PROJECT_START_PROJECT_SESSION = "start-project-session",
  PROJECT_OPEN_PROJECT_FOLDER = "open-project-folder",
  PROJECT_DELETE_PROJECT_FOLDER = "delete-project-folder",
  README_FOCUS_ON_README = "focus-on-readme",
  UI_PREVIOUS_TAB = "previous-tab",
  VIM_ESC = "esc",
  VIM_SELECTION_MODE = "selection-mode",
  VIM_JUMP_TO_BOTTOM = "jump-to-bottom",
  VIM_JUMP_TO_TOP = "jump-to-top",
}

export interface Keybinding {
  key: string; // e.g. "enter", "x", "r", "o"
  label: string; // human readable: "Attach", "Kill session", ...
  action: Action;
}

export function generateKeybindingFromSelectionItem(
  item: SelectableItem,
): Keybinding[] {
  switch (item.kind) {
    case SelectableItemsTypes.SESSION: {
      const keybinding: Keybinding[] = [
        {
          key: "<enter>",
          label: "Attach",
          action: Action.SESSION_SWITCH_SESSION_CLIENT,
        },
        {
          key: "x",
          label: "Kill",
          action: Action.SESSION_KILL_SESSION,
        },
        {
          key: "r",
          label: "Readme",
          action: Action.README_FOCUS_ON_README,
        },
      ];
      return keybinding;
    }

    case SelectableItemsTypes.PROJECT: {
      const keybinding: Keybinding[] = [
        {
          key: "<enter>",
          label: "Start session",
          action: Action.PROJECT_START_PROJECT_SESSION,
        },
        {
          key: "o",
          label: "Open",
          action: Action.PROJECT_OPEN_PROJECT_FOLDER,
        },
        {
          key: "d",
          label: "Delete",
          action: Action.PROJECT_DELETE_PROJECT_FOLDER,
        },
        {
          key: "r",
          label: "Readme",
          action: Action.README_FOCUS_ON_README,
        },
      ];
      return keybinding;
    }
  }
}

export function generateVimBinding(): Keybinding[] {
  const keybinding: Keybinding[] = [
    {
      key: "G",
      label: "Jump to bottom",
      action: Action.VIM_JUMP_TO_BOTTOM,
    },
  ];
  return keybinding;
}

export function generateKeybindingForReadme(): Keybinding[] {
  const keybinding: Keybinding[] = [
    {
      key: "h",
      label: "Previous Tab",
      action: Action.UI_PREVIOUS_TAB,
    },
  ];
  return keybinding;
}

export function getKeybindingDescription(
  keybinding: Keybinding[] | null,
): string {
  if (!keybinding) return "";
  let description = "";
  keybinding.map((action, idx) => {
    description =
      description +
      `${action.label}: ${action.key}${idx != keybinding.length - 1 ? " | " : ""}`;
  });
  return description;
}
