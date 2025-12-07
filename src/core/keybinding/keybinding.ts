import type { SelectableItem } from "../../data/types";

export enum Action {
  SWITCH_SESSION_CLIENT = "switch-client",
  KILL_SESSION = "kill-session",
  RENAME_SESSION = "rename-session",
  START_PROJECT_SESSION = "start-project-session",
  OPEN_PROJECT_FOLDER = "open-project-folder",
  DELETE_PROJECT_FOLDER = "delete-project-folder",
  FOCUS_ON_README = "focus-on-readme",
}

type SessionAction =
  | Action.SWITCH_SESSION_CLIENT
  | Action.KILL_SESSION
  | Action.FOCUS_ON_README
  | Action.RENAME_SESSION;

type ProjectAction =
  | Action.START_PROJECT_SESSION
  | Action.OPEN_PROJECT_FOLDER
  | Action.FOCUS_ON_README
  | Action.DELETE_PROJECT_FOLDER;

export const isDestroyAction = (action: Action) => {
  return (
    action === Action.DELETE_PROJECT_FOLDER || action === Action.KILL_SESSION
  );
};

export interface KeyBindingInfo<A extends Action = Action> {
  key: string; // e.g. "enter", "x", "r", "o"
  label: string; // human readable: "Attach", "Kill session", ...
  action: A;
}

export type Keybinding<A extends Action = Action> = KeyBindingInfo<A>[];
type SessionKeybinding = Keybinding<SessionAction>;
type ProjectKeybinding = Keybinding<ProjectAction>;

export function generateKeybindingFromSelectionItem(
  item: SelectableItem,
): Keybinding {
  switch (item.kind) {
    case "session": {
      const keybinding: SessionKeybinding = [
        {
          key: "<enter>",
          label: "Attach",
          action: Action.SWITCH_SESSION_CLIENT,
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
      //     action: Action.ATTACH_SESSION,
      //     label: "🟢 current session",
      //   });
      // }

      return keybinding;
    }

    case "project": {
      const keybinding: ProjectKeybinding = [
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
      return keybinding;
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
