import type { SelectOption } from "@opentui/core";
import type { Project, Session } from "../../data/types";
import { useState } from "react";

export interface SelectSectionProps {
  sectionHeader: string;
  sectionType: string;
  options: Project[] | Session[];
  handleSelect?: (index: number, option: SelectOption | null) => void;
  handleOnChange?: (index: number, option: SelectOption | null) => void;
  focoused: boolean;
}

export function ProjectSelection({
  sectionHeader,
  handleSelect,
  handleOnChange,
  focoused = false,
  options,
}: SelectSectionProps) {
  const [data, setData] = useState<Session | Project>();
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
        options={options.map((s) => ({
          name: s.name,
          description: "description",
          value: s,
        }))}
        style={{ flexGrow: 1 }}
      />
    </box>
  );
}
