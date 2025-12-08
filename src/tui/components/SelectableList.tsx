import { type SectionType, type SelectableItem } from "../../data/types";
import { useEffect, useState } from "react";
import { converSelectableItemToSelectOption } from "../../utils/typeConversions";

export interface SelectableListProps {
  sectionType: SectionType;
  sectionHeader: string;
  handleSelect: (index: number, item: SelectableItem | null) => void;
  handleOnChange: (index: number, item: SelectableItem | null) => void;
  handleReadme: () => void;
  data: SelectableItem[];
  focoused: boolean;
}

export function SelectableList({
  sectionType,
  sectionHeader,
  handleSelect,
  handleOnChange,
  handleReadme,
  data: items,
  focoused = false,
}: SelectableListProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  const onFocous = () => {
    if (!focoused) return;
    if (!items[selectedIdx]) return;
    handleOnChange(selectedIdx, items[selectedIdx]);
  };

  // workaround, FIX this when possible. solve such that on data arrival for the firs time, update
  useEffect(() => {
    if (!focoused) return;
    if (items && items.length > 0 && items[0] && selectedIdx === -1) {
      console.log("🟥 [SelectableList.tsx]: was here"); // LTS-log-mark
      onChange(0, items[0]);
    }
  }, [focoused, items]);

  useEffect(() => {
    if (!focoused) return;
    onFocous();
  }, [focoused]);

  const onChange = (idx: number, item: SelectableItem | null) => {
    setSelectedIdx(idx);
    handleOnChange(idx, item);
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
        onSelect={(idx, option) => handleSelect(idx, option?.value)}
        onChange={(idx, option) => onChange(idx, option?.value)}
        options={items.map((item) => converSelectableItemToSelectOption(item))}
        style={{ flexGrow: 1 }}
      />
    </box>
  );
}
