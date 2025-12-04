import { createCliRenderer, KeyEvent } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import React, { useEffect, useState } from "react";
import { api } from "./api";
import type { Session, Project } from "./api/types";

function App() {
  const renderer = useRenderer();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTab, setSelectedTab] = useState<
    "sessions" | "projects" | "readme"
  >("sessions");

  console.log("selectedTab:", selectedTab);

  useKeyboard((key: KeyEvent) => {
    if (key.ctrl && key.name == "t") {
      renderer.console.toggle();
    }
    if (key.name === "tab") {
      setSelectedTab(selectedTab === "sessions" ? "projects" : "sessions");
    }
  });

  useEffect(() => {
    // “fake calls” – they hit your mock API which reads JSON
    api.listSessions().then(setSessions).catch(console.error);
    api.listProjects().then(setProjects).catch(console.error);
  }, []);

  return (
    <box
      border
      height={"100%"}
      borderStyle="rounded"
      title="lazymux"
      titleAlignment="center"
      flexDirection="row"
    >
      <box width={"30%"}>
        <box border height={"50%"} title={"[1]-sessions"}>
          <select
            focused={selectedTab == "sessions"}
            showScrollIndicator
            wrapSelection
            options={sessions.map((s) => ({
              name: s.name,
              description: "description",
              value: s.name,
            }))}
            style={{ flexGrow: 1 }}
          />
        </box>

        <box border height={"50%"} title={"[2]-projects"}>
          <select
            focused={selectedTab == "projects"}
            showScrollIndicator
            wrapSelection
            options={projects.map((s) => ({
              name: s.path,
              description: "description",
              value: s.name,
            }))}
            style={{ flexGrow: 1 }}
          />
        </box>
      </box>

      <box
        border
        width={"70%"}
        title={"project's readme"}
        titleAlignment="center"
      >
        <text>select a project to show its README here…</text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
