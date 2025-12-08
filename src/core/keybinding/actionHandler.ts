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

export const keybindHandler: Record<Action, ActionHandler> = {
  // -----------------------------
  // SESSION ACTIONS
  // -----------------------------
  [Action.SESSION_KILL_SESSION]: async ({ name }) => {
    return killTmuxSession(name);
  },

  [Action.SESSION_SWITCH_SESSION_CLIENT]: async ({ name }) => {
    return switchTmuxSession(name);
  },

  [Action.SESSION_RENAME_SESSION]: async ({ name }) => {
    console.log("SESSION_RENAME_SESSION not implemented. Name:", name);
    return false;
  },

  // -----------------------------
  // PROJECT ACTIONS
  // -----------------------------
  [Action.PROJECT_START_PROJECT_SESSION]: async ({ name, path }) => {
    if (!path) {
      console.error("PROJECT_START_PROJECT_SESSION requires a path.");
      return false;
    }
    return createTmuxSession(name, path);
  },

  [Action.PROJECT_OPEN_PROJECT_FOLDER]: async ({ name, path }) => {
    console.log("PROJECT_OPEN_PROJECT_FOLDER not implemented.", { name, path });
    return false;
  },

  [Action.PROJECT_DELETE_PROJECT_FOLDER]: async ({ name, path }) => {
    console.log("PROJECT_DELETE_PROJECT_FOLDER not implemented.", {
      name,
      path,
    });
    return false;
  },

  // -----------------------------
  // README / UI ACTIONS
  // -----------------------------
  [Action.README_FOCUS_ON_README]: async () => {
    console.log("README_FOCUS_ON_README triggered (needs UI handler).");
    return false;
  },

  [Action.UI_PREVIOUS_TAB]: async () => {
    console.log("UI_PREVIOUS_TAB triggered (needs UI handler).");
    return false;
  },

  // -----------------------------
  // VIM MODE ACTIONS
  // -----------------------------
  [Action.VIM_ESC]: async () => {
    console.log("VIM_ESC triggered.");
    return false;
  },

  [Action.VIM_SELECTION_MODE]: async () => {
    console.log("VIM_SELECTION_MODE triggered.");
    return false;
  },

  [Action.VIM_JUMP_TO_BOTTOM]: async () => {
    console.log("VIM_JUMP_TO_BOTTOM triggered.");
    return false;
  },

  [Action.VIM_JUMP_TO_TOP]: async () => {
    console.log("VIM_JUMP_TO_TOP triggered.");
    return false;
  },
};
