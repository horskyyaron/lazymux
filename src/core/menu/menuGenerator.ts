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

function getMenuForItem(item: SelectableItem): Menu {
  switch (item.kind) {
    case "session": {
      const menu: Menu = [
        {
          key: "<enter>",
          label: "Attach",
          action: "attach-session",
        },
        {
          key: "x",
          label: "Kill",
          action: "kill-session",
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

export function generateMenuLineForItem(item: SelectableItem): string {
  const menu = getMenuForItem(item);
  let menuLine = "";
  menu.map((action, idx) => {
    menuLine =
      menuLine +
      `${action.label}: ${action.key}${idx != menu.length - 1 ? " | " : ""}`;
  });
  console.log("menu line after concat", menuLine);
  return menuLine;
}
