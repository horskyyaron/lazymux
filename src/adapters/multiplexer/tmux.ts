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
