import {
  killTmuxSession,
  switchTmuxSession,
} from "../../adapters/multiplexer/tmux";
import { Action } from "./keybinding";

type ActionHandler = (payload: { name: string }) => Promise<boolean>;

export const actionHandlers: Record<Action, ActionHandler> = {
  [Action.KILL_SESSION]: async ({ name }) => killTmuxSession(name),
  [Action.ATTACH_SESSION]: async ({ name }) => switchTmuxSession(name),
  [Action.RENAME_SESSION]: async ({ name }) => {
    // placeholder
    console.log("rename session not implemented");
    return false;
  },
  [Action.START_PROJECT_SESSION]: async ({ name }) => {
    console.log("start project session", name);
    return false;
  },
  [Action.OPEN_PROJECT_FOLDER]: async ({ name }) => {
    console.log("open folder", name);
    return false;
  },
  [Action.DELETE_PROJECT_FOLDER]: async ({ name }) => {
    console.log("delete folder", name);
    return false;
  },
  [Action.FOCUS_ON_README]: async ({ name }) => {
    console.log("focus on readme", name);
    return false;
  },
};
