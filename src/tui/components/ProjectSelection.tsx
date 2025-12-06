import type { SelectOption } from "@opentui/core";
import type { Project, SelectableItem, Session } from "../../data/types";
import { useEffect, useState } from "react";
import { api } from "../../core";
import {
  projectToSelectable,
  sessionToSelectable,
} from "../../utils/typeConversions";

export interface SelectSectionProps {
  sectionType: string;
  sectionHeader: string;
  handleSelect?: (index: number, option: SelectOption | null) => void;
  handleOnChange?: (index: number, option: SelectOption | null) => void;
  focoused: boolean;
}

export const converSelectableItemToSelectOption = (
  item: SelectableItem,
): SelectOption => {
  return {
    name: item.name,
    description: "",
    value: item,
  };
};

export function ProjectSelection({
  sectionType,
  sectionHeader,
  handleSelect,
  handleOnChange,
  focoused = false,
}: SelectSectionProps) {
  const [data, setData] = useState<SelectableItem[]>();

  useEffect(() => {
    if (sectionType === "sessions") {
      api
        .getSessions()
        .then((sessions) => sessions.map(sessionToSelectable))
        .then(setData)
        .catch(console.error);
    } else if (sectionType === "projects") {
      api
        .getProjects()
        .then((projects) => projects.map(projectToSelectable))
        .then(setData)
        .catch(console.error);
    }
  }, []);

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
        onChange={handleOnChange}
        options={data?.map((item) => converSelectableItemToSelectOption(item))}
        style={{ flexGrow: 1 }}
      />
    </box>
  );
}
