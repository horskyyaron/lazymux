import { createCliRenderer, KeyEvent, type SelectOption } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectableList } from "./components/SelectableList";
import { api } from "../core";
import {
  SelectableItemsTypes,
  Tabs,
  type ListSection,
  type Project,
  type SelectableItem,
  type Session,
} from "../data/types";
import {
  Action,
  generateKeybindingForReadme,
  generateKeybindingFromSelectionItem,
  getKeybindingDescription,
  type Keybinding,
} from "../core/keybinding/keybinding";
import { actionHandlers } from "../core/keybinding/actionHandler";
import {
  projectToSelectable,
  sessionToSelectable,
} from "../utils/typeConversions";

function App() {
  const renderer = useRenderer();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.SESSIONS);
  const [readme, setReadme] = useState<string>("");
  const [keybinding, setKeybinding] = useState<Keybinding | null>(null);
  const [previousTab, setPreviousTab] = useState<Tabs>(Tabs.SESSIONS);
  const [currentSelection, setCurrentSelection] =
    useState<SelectableItem | null>(null);

  const refetchSessions = useCallback(async () => {
    const data = await api.getSessions();
    setSessions(data);
  }, []);

  const refetchProjects = useCallback(async () => {
    const data = await api.getProjects();
    setProjects(data);
  }, []);

  // maybe initial load
  useEffect(() => {
    void refetchSessions();
    void refetchProjects();
  }, [refetchSessions, refetchProjects]);

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
    } else if (key.name === "h") {
      setSelectedTab(previousTab);
    } else if (key.name === "q") {
      process.exit();
    }
  });

  const handleReadme = async () => {
    setPreviousTab(selectedTab);
    setSelectedTab(Tabs.README);
    setKeybinding(generateKeybindingForReadme());
  };

  const handleSelect = async (index: number, item: SelectableItem | null) => {
    if (!item) return;
    item.kind === SelectableItemsTypes.SESSION
      ? // ? handleSessionSelect(index, item.data)
        actionHandlers[Action.SWITCH_SESSION_CLIENT]({
          name: item.data.name,
        })
      : actionHandlers[Action.START_PROJECT_SESSION]({
          name: item.data.name,
          path: item.data.path,
        });
  };

  const handleOnChange = async (index: number, item: SelectableItem | null) => {
    if (!item) return;
    setCurrentSelection(item);
    setKeybinding(generateKeybindingFromSelectionItem(item));
    const readme = await api.getProjectReadme(item.data);
    setReadme(readme);
  };

  const ListSections: ListSection[] = [
    {
      sectionTabName: "sessions",
      sectionType: Tabs.SESSIONS,
      data: sessions.map((s) => sessionToSelectable(s)),
    },
    {
      sectionTabName: "projects",
      sectionType: Tabs.PROJECTS,
      data: projects.map((p) => projectToSelectable(p)),
    },
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
          {ListSections.map((s, idx) => {
            return (
              <SelectableList
                key={idx}
                sectionHeader={`[${idx + 1}]-${s.sectionTabName}`}
                sectionType={s.sectionType}
                focoused={selectedTab == s.sectionTabName}
                handleSelect={handleSelect}
                handleOnChange={handleOnChange}
                handleReadme={handleReadme}
                data={s.data}
              />
            );
          })}
        </box>
        <box
          border
          borderColor={selectedTab === Tabs.README ? "yellow" : "white"}
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
            focused={selectedTab === Tabs.README}
          >
            <text>{readme}</text>
          </scrollbox>
        </box>
      </box>
      <box flexDirection="row">
        <text>{getKeybindingDescription(keybinding)}</text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
