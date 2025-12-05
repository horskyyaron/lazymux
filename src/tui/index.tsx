import { createCliRenderer, KeyEvent } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import React, { useEffect, useState } from "react";
import { ProjectSelection } from "./components/ProjectSelection";
import { api } from "../core";
import type { Project, Session } from "../data/types";

function App() {
  const renderer = useRenderer();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTab, setSelectedTab] = useState<
    "sessions" | "projects" | "readme"
  >("sessions");
  const [readme, setReadme] = useState<string>("");

  useKeyboard((key: KeyEvent) => {
    if (key.ctrl && key.name == "t") {
      renderer.console.toggle();
    } else if (key.name === "tab") {
      setSelectedTab(selectedTab === "sessions" ? "projects" : "sessions");
    } else if (key.name === "1") {
      setSelectedTab("sessions");
    } else if (key.name === "2") {
      setSelectedTab("projects");
    }
  });

  useEffect(() => {
    // “fake calls” – they hit your mock API which reads JSON
    api.getSessions().then(setSessions).catch(console.error);
    api.getProjects().then(setProjects).catch(console.error);
  }, []);

  const handleSessionSelected = async (index: number, option: any) => {
    console.log("selected");
  };

  const handleOnChange = async (index: number, option: any) => {
    const readme = await api.getProjectReadme(option.value);
    setReadme(readme);
  };

  const sections = [
    { sectionTabName: "sessions", data: sessions },
    { sectionTabName: "projects", data: projects },
  ];

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
        {sections.map((s, idx) => {
          return (
            <ProjectSelection
              key={idx}
              sectionHeader={`[${idx}]-${s.sectionTabName}`}
              focoused={selectedTab == s.sectionTabName}
              sectionName={s.sectionTabName}
              handleSelect={handleSessionSelected}
              handleOnChange={handleOnChange}
              options={s.data}
            />
          );
        })}
      </box>
      <box
        border
        width={"70%"}
        title={"project's readme"}
        titleAlignment="center"
      >
        <text>{readme}</text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
