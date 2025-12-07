import type { SelectableItem } from "../../data/types";

export enum Action {
  ATTACH_SESSION = "attach-session",
  KILL_SESSION = "kill-session",
  RENAME_SESSION = "rename-session",
  START_PROJECT_SESSION = "start-project-session",
  OPEN_PROJECT_FOLDER = "open-project-folder",
  DELETE_PROJECT_FOLDER = "delete-project-folder",
  FOCUS_ON_README = "focus-on-readme",
}

type SessionAction =
  | Action.ATTACH_SESSION
  | Action.KILL_SESSION
  | Action.FOCUS_ON_README
  | Action.RENAME_SESSION;

type ProjectAction =
  | Action.START_PROJECT_SESSION
  | Action.OPEN_PROJECT_FOLDER
  | Action.FOCUS_ON_README
  | Action.DELETE_PROJECT_FOLDER;

export interface KeyBindingInfo<A extends Action = Action> {
  key: string; // e.g. "enter", "x", "r", "o"
  label: string; // human readable: "Attach", "Kill session", ...
  action: A;
}

export type Keybinding<A extends Action = Action> = KeyBindingInfo<A>[];
type SessionMenu = Keybinding<SessionAction>;
type ProjectMenu = Keybinding<ProjectAction>;

export function generateKeybindingFromSelectionItem(
  item: SelectableItem,
): Keybinding {
  switch (item.kind) {
    case "session": {
      const menu: SessionMenu = [
        {
          key: "<enter>",
          label: "Attach",
          action: Action.ATTACH_SESSION,
        },
        {
          key: "x",
          label: "Kill",
          action: Action.KILL_SESSION,
        },
        {
          key: "r",
          label: "Readme",
          action: Action.FOCUS_ON_README,
        },
      ];

      // // Example: dynamic options based on state
      // if (item.isCurrent) {
      //   // maybe add a "mark as current" or something
      //   menu.push({
      //     key: "x",
      //     action: "attach-session",
      //     label: "🟢 current session",
      //   });
      // }

      return menu;
    }

    case "project": {
      const menu: ProjectMenu = [
        {
          key: "<enter>",
          label: "Start session",
          action: Action.START_PROJECT_SESSION,
        },
        {
          key: "o",
          label: "Open",
          action: Action.OPEN_PROJECT_FOLDER,
        },
        {
          key: "d",
          label: "Delete",
          action: Action.DELETE_PROJECT_FOLDER,
        },
        {
          key: "r",
          label: "Readme",
          action: Action.FOCUS_ON_README,
        },
      ];
      return menu;
    }
  }
}

export function getKeybindingDescription(
  keybinding: Keybinding | null,
): string {
  if (!keybinding) return "";
  let menuLine = "";
  keybinding.map((action, idx) => {
    menuLine =
      menuLine +
      `${action.label}: ${action.key}${idx != keybinding.length - 1 ? " | " : ""}`;
  });
  return menuLine;
}
