import type { KeyEvent, SelectOption, TabSelect } from "@opentui/core";
import { Tabs, type SectionType, type SelectableItem } from "../../data/types";
import { useEffect, useState } from "react";
import { api } from "../../core";
import {
  projectToSelectable,
  sessionToSelectable,
} from "../../utils/typeConversions";
import { useKeyboard } from "@opentui/react";
import {
  generateKeybindingFromSelectionItem,
  type Keybinding,
} from "../../core/menu/keybinding";

export interface SelectableListProps {
  sectionType: SectionType;
  sectionHeader: string;
  handleSelect: (index: number, option: SelectOption | null) => void;
  handleOnChange: (index: number, option: SelectOption | null) => void;
  focoused: boolean;
}

export const converSelectableItemToSelectOption = (
  item: SelectableItem,
): SelectOption => {
  return {
    name:
      item.kind === "session" && item.isCurrent
        ? `🟢 ${item.name} (attached)`
        : item.name,
    description: "",
    value: item,
  };
};

export function SelectableList({
  sectionType,
  sectionHeader,
  handleSelect,
  handleOnChange,
  focoused = false,
}: SelectableListProps) {
  const [data, setData] = useState<SelectableItem[]>();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [selectionKeybinding, setSelectionKeybinding] =
    useState<Keybinding | null>(null);

  const refetch = () => {
    const apiCall: () => Promise<SelectableItem[]> =
      sectionType === Tabs.SESSIONS
        ? () =>
            api
              .getSessions()
              .then((sessions) => sessions.map(sessionToSelectable))
        : () =>
            api
              .getProjects()
              .then((projects) => projects.map(projectToSelectable));

    apiCall()
      .then((items) => {
        setData(items);
        handleOnChange(
          selectedIdx,
          converSelectableItemToSelectOption(items[selectedIdx]!),
        );
        setSelectionKeybinding(
          generateKeybindingFromSelectionItem(items[selectedIdx]!),
        );
      })
      .catch(console.error);
  };

  useKeyboard((key: KeyEvent) => {
    if (focoused) {
      selectionKeybinding?.map((keymap) => {
        if (key.name === keymap.key) {
          console.log(keymap.action);
        }
      });
    }
  });

  useEffect(() => {
    if (!data) {
      refetch();
    } else {
      if (!focoused) return;
      handleOnChange(
        selectedIdx,
        converSelectableItemToSelectOption(data[selectedIdx]!),
      );
    }
  }, [focoused]);

  const onChange = (idx: number, option: SelectOption | null) => {
    setSelectedIdx(idx);
    handleOnChange(idx, option);
  };

  return (
    <box
      title={sectionHeader}
      style={{
        border: true,
        height: "50%",
        borderColor: focoused ? "yellow" : "white",
      }}
    >
      <select
        focused={focoused}
        showScrollIndicator
        wrapSelection
        selectedBackgroundColor={focoused ? "orange" : "transparent"}
        selectedTextColor={focoused ? "black" : "white"}
        showDescription={false}
        focusedBackgroundColor={"transparent"}
        onSelect={handleSelect}
        onChange={onChange}
        options={data?.map((item) => converSelectableItemToSelectOption(item))}
        style={{ flexGrow: 1 }}
      />
    </box>
  );
}
