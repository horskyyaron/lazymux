import { createCliRenderer, KeyEvent } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import React, { useEffect, useState } from "react";
import { ProjectSelection } from "./components/ProjectSelection";
import { api } from "../core";
import { Tabs, type Project, type Session } from "../data/types";

function App() {
  const renderer = useRenderer();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.SESSIONS);
  const [readme, setReadme] = useState<string>("");
  const [candidateSelection, setCandidateSelection] = useState<{
    type: "session" | "project";
    value: Session | Project;
  }>();

  useKeyboard((key: KeyEvent) => {
    if (key.ctrl && key.name == "t") {
      renderer.console.toggle();
    } else if (key.name === "tab") {
      setSelectedTab(
        selectedTab === Tabs.SESSIONS ? Tabs.PROJECTS : Tabs.SESSIONS,
      );
    } else if (key.name === "1") {
      setSelectedTab(Tabs.SESSIONS);
    } else if (key.name === "2") {
      setSelectedTab(Tabs.PROJECTS);
    }
  });

  useEffect(() => {
    api.getSessions().then(setSessions).catch(console.error);
    api.getProjects().then(setProjects).catch(console.error);
  }, []);

  const handleProjectSelect = async (index: number, option: any) => {
    setSelectedTab(Tabs.README);
  };

  const handleSessionSelect = async (index: number, option: any) => {
    console.log("handle session select!");
  };

  const handleSelect = async (index: number, option: any) => {
    if (selectedTab === "sessions") handleSessionSelect(index, option);
    else handleProjectSelect(index, option);
  };

  const handleOnChange = async (index: number, option: any) => {
    const readme = await api.getProjectReadme(option.value);
    setReadme(readme);
  };

  const sections = [
    { sectionTabName: "sessions", sectionType: "sessions", data: sessions },
    { sectionTabName: "projects", sectionType: "projects", data: projects },
  ];

  return (
    <box
      border
      height={"100%"}
      borderStyle="rounded"
      title="lazymux"
      titleAlignment="center"
    >
      <box flexDirection="row" maxHeight={"99%"}>
        <box width={"30%"}>
          {sections.map((s, idx) => {
            return (
              <ProjectSelection
                key={idx}
                sectionHeader={`[${idx + 1}]-${s.sectionTabName}`}
                sectionType={s.sectionType}
                focoused={selectedTab == s.sectionTabName}
                handleSelect={handleSelect}
                handleOnChange={handleOnChange}
                options={s.data}
              />
            );
          })}
        </box>
        <box
          border
          borderColor={selectedTab === "readme" ? "yellow" : "white"}
          width={"70%"}
          title={"project's readme"}
          titleAlignment="center"
        >
          <scrollbox
            style={{
              scrollbarOptions: {
                trackOptions: {
                  foregroundColor: "#7aa2f7",
                  backgroundColor: "#414868",
                },
              },
            }}
            focused={selectedTab === "readme"}
          >
            <text>{readme}</text>
          </scrollbox>
        </box>
      </box>
      <box>
        <text>hi</text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
