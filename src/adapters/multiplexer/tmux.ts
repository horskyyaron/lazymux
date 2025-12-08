import type { Session } from "../../data/types";

import { exec } from "child_process";

function run(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return resolve(stderr); // tmux sometimes writes to stderr
      resolve(stdout);
    });
  });
}

export async function getTmuxSessions(): Promise<Session[]> {
  const names = (await run("tmux list-sessions -F '#{session_name}'"))
    .trim()
    .split("\n")
    .filter(Boolean);
  const current = (await run("tmux display-message -p '#S'")).trim();
  const sessions: Session[] = [];
  for (const name of names) {
    const path = (
      await run(`tmux display-message -p -t ${name} '#{pane_current_path}'`)
    ).trim();
    sessions.push({
      id: name,
      name,
      path,
      isCurrent: name === current,
    });
  }
  return sessions;
}

export async function killTmuxSession(name: string): Promise<boolean> {
  try {
    await run(`tmux kill-session -t ${name}`);
    return true;
  } catch (err) {
    console.error("Failed to kill session:", err);
    return false;
  }
}

export async function switchTmuxSession(name: string): Promise<boolean> {
  try {
    // Switch the active client to the target session
    await run(`tmux switch-client -t ${name}`);
    return true;
  } catch (err) {
    console.error("Failed to switch session:", err);
    return false;
  }
}

export async function createTmuxSession(
  name: string,
  path: string,
): Promise<boolean> {
  try {
    // Switch the active client to the target session
    await run(`tmux new-session -d -s ${name} -c ${path}`);
    return true;
  } catch (err) {
    console.error("Failed to switch session:", err);
    return false;
  }
}
