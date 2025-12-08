import {
  createTmuxSession,
  killTmuxSession,
  switchTmuxSession,
} from "../../adapters/multiplexer/tmux";
import { Action } from "./keybinding";

type ActionHandler = (payload: {
  name: string;
  path?: string;
}) => Promise<boolean>;

export const actionHandlers: Record<Action, ActionHandler> = {
  [Action.KILL_SESSION]: async ({ name }) => await killTmuxSession(name),
  [Action.SWITCH_SESSION_CLIENT]: async ({ name }) =>
    await switchTmuxSession(name),
  [Action.START_PROJECT_SESSION]: async ({ name, path }) => {
    if (!path)
      throw new Error("must provide a path for starting a new session");
    return await createTmuxSession(name, path);
  },
  [Action.OPEN_PROJECT_FOLDER]: async ({ name }) => {
    console.log("open folder", name);
    return false;
  },
  [Action.DELETE_PROJECT_FOLDER]: async ({ name }) => {
    console.log("delete folder", name);
    return false;
  },
  [Action.FOCUS_ON_README]: function (payload: {
    name: string;
  }): Promise<boolean> {
    throw new Error("Function not implemented.");
  },
  [Action.PREVIOUS_TAB]: function (payload: {
    name: string;
  }): Promise<boolean> {
    throw new Error("Function not implemented.");
  },
  [Action.RENAME_SESSION]: async ({ name }) => {
    // placeholder
    console.log("rename session not implemented");
    return false;
  },
};
