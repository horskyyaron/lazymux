import type { SelectableItem } from "../../data/types";

export type ActionId =
  | "attach-session"
  | "kill-session"
  | "rename-session"
  | "start-project-session"
  | "open-project-folder";

export interface KeyBinding {
  key: string; // e.g. "enter", "x", "r", "o"
  label: string; // human readable: "Attach", "Kill session", ...
  action: ActionId;
}

export type Menu = KeyBinding[];

export function getMenuForItem(item: SelectableItem): Menu {
  switch (item.kind) {
    case "session": {
      const menu: Menu = [
        {
          key: "enter",
          label: "Attach session",
          action: "attach-session",
        },
        {
          key: "x",
          label: "Kill session",
          action: "kill-session",
        },
        {
          key: "r",
          label: "Rename session",
          action: "rename-session",
        },
      ];

      // Example: dynamic options based on state
      if (item.isCurrent) {
        // maybe add a "mark as current" or something
        menu.push({
          key: "x",
          action: "attach-session",
          label: "🟢 current session",
        });
      }

      return menu;
    }

    case "project": {
      return [
        {
          key: "enter",
          label: "Start tmux session",
          action: "start-project-session",
        },
        {
          key: "o",
          label: "Open project folder",
          action: "open-project-folder",
        },
      ];
    }
  }
}
