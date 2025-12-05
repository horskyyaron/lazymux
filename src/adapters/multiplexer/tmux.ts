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
  // tmux format: "session_name:..."
  const output = await run("tmux list-sessions -F '#{session_name}'");
  const currentSession = (await run("tmux display-message -p '#S'")).trim();

  const lines = output
    .trim()
    .split("\n")
    .filter((l) => l.length > 0);

  return lines.map((name) => ({
    id: name,
    name,
    path: "",
    isCurrent: name === currentSession,
  }));
}
