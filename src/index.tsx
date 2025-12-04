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

  const handleSessionSelected = (index: number, option: any) => {
    console.log(index, option);
  };

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
        <box
          title="[1]-sessions"
          style={{
            border: true,
            height: "50%",
            borderColor: selectedTab === "sessions" ? "yellow" : "white",
          }}
        >
          <select
            focused={selectedTab == "sessions"}
            showScrollIndicator
            wrapSelection
            selectedBackgroundColor={
              selectedTab === "sessions" ? "orange" : "transparent"
            }
            selectedTextColor={selectedTab === "sessions" ? "black" : "white"}
            showDescription={false}
            focusedBackgroundColor={"transparent"}
            onSelect={handleSessionSelected}
            options={sessions.map((s) => ({
              name: s.name,
              description: "description",
              value: { name: "yaron" },
            }))}
            style={{ flexGrow: 1 }}
          />
        </box>

        <box
          title="[2]-projects"
          style={{
            border: true,
            height: "50%",
            borderColor: selectedTab === "projects" ? "yellow" : "white",
          }}
        >
          <select
            focused={selectedTab == "projects"}
            showScrollIndicator
            wrapSelection
            showDescription={false}
            focusedBackgroundColor={"transparent"}
            selectedBackgroundColor={
              selectedTab === "projects" ? "orange" : "transparent"
            }
            selectedTextColor={selectedTab === "projects" ? "black" : "white"}
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
