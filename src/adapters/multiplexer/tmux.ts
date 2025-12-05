import type { promises } from "dns";
import { promises as fs } from "fs";
import path from "path";

import sessionJson from "../../data/mockSessions.json";
import type { Session } from "../../data/types";

const sessions = sessionJson as Session[];
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getTmuxSessions(): Promise<Session[]> {
  await sleep(150);
  return sessions;
}
