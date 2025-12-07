import { createCliRenderer, KeyEvent, type SelectOption } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import { useState } from "react";
import { SelectableList } from "./components/SelectableList";
import { api } from "../core";
import { Tabs, type ListSection, type SelectableItem } from "../data/types";
import {
  Action,
  generateKeybindingForReadme,
  generateKeybindingFromSelectionItem,
  getKeybindingDescription,
  type Keybinding,
} from "../core/keybinding/keybinding";
import { actionHandlers } from "../core/keybinding/actionHandler";

function App() {
  const renderer = useRenderer();
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.SESSIONS);
  const [readme, setReadme] = useState<string>("");
  const [keybinding, setKeybinding] = useState<Keybinding | null>(null);
  const [previousTab, setPreviousTab] = useState<Tabs>(Tabs.SESSIONS);
  const [currentSelection, setCurrentSelection] =
    useState<SelectableItem | null>(null);

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

  const handleProjectSelect = async (index: number, option: SelectOption) => {
    actionHandlers[Action.START_PROJECT_SESSION]({ name: option.name });
  };

  const handleSessionSelect = async (index: number, option: SelectOption) => {
    actionHandlers[Action.SWITCH_SESSION_CLIENT]({ name: option.name });
  };

  const handleSelect = async (index: number, option: SelectOption | null) => {
    if (!option) return;
    selectedTab === Tabs.SESSIONS
      ? handleSessionSelect(index, option)
      : handleProjectSelect(index, option);
  };

  const handleOnChange = async (index: number, option: SelectOption | null) => {
    if (!option) return;
    const selection = option.value as SelectableItem;
    setCurrentSelection(selection);
    setKeybinding(generateKeybindingFromSelectionItem(selection));
    const readme = await api.getProjectReadme(selection);
    setReadme(readme);
  };

  const ListSections: ListSection[] = [
    { sectionTabName: "sessions", sectionType: Tabs.SESSIONS },
    { sectionTabName: "projects", sectionType: Tabs.PROJECTS },
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
