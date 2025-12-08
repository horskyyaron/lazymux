import { type SectionType, type SelectableItem } from "../../data/types";
import { useEffect, useState } from "react";
import { converSelectableItemToSelectOption } from "../../utils/typeConversions";
import { useKeyboard } from "@opentui/react";
import type { KeyEvent } from "@opentui/core";
import {
  generateKeybindingFromSelectionItem,
  type Keybinding,
} from "../../core/keybinding/keybinding";
import { actionHandlers } from "../../core/keybinding/actionHandler";

export interface SelectableListProps {
  sectionType: SectionType;
  sectionHeader: string;
  handleSelect: (index: number, item: SelectableItem | null) => void;
  handleOnChange: (index: number, item: SelectableItem | null) => void;
  handleReadme: () => void;
  handleRefetch: () => Promise<void>;
  data: SelectableItem[];
  focoused: boolean;
}

export function SelectableList({
  sectionType,
  sectionHeader,
  handleSelect,
  handleOnChange,
  handleReadme,
  handleRefetch,
  data: items,
  focoused = false,
}: SelectableListProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [keybinidng, setKeybinding] = useState<Keybinding | null>(null);

  useKeyboard((key: KeyEvent) => {
    const selection = items[selectedIdx];
    if (!selection) return;
    if (focoused) {
      keybinidng?.map(async (binding) => {
        if (key.name === binding.key) {
          await actionHandlers[binding.action]({
            name: selection.data.name,
            path: selection.data.path ?? undefined,
          });
          await handleRefetch();
        }
      });
    }
  });

  const onFocous = () => {
    if (!focoused) return;
    if (!items[selectedIdx]) return;
    handleOnChange(selectedIdx, items[selectedIdx]);
  };

  // HACK: workaround, FIX this when possible. solve such that on data arrival for the firs time, update
  useEffect(() => {
    if (!focoused) return;
    if (items && items.length > 0 && items[0] && selectedIdx === -1) {
      onChange(0, items[0]);
    }
  }, [focoused, items]);

  useEffect(() => {
    if (!focoused) return;
    onFocous();
  }, [focoused]);

  const onChange = (idx: number, item: SelectableItem) => {
    setSelectedIdx(idx);
    setKeybinding(generateKeybindingFromSelectionItem(item));
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
