import type { KeyEvent, SelectOption, TabSelect } from "@opentui/core";
import {
  SelectableItemsTypes,
  Tabs,
  type SectionType,
  type SelectableItem,
} from "../../data/types";
import { useEffect, useState } from "react";
import { api } from "../../core";
import {
  projectToSelectable,
  sessionToSelectable,
} from "../../utils/typeConversions";
import { useKeyboard } from "@opentui/react";
import {
  Action,
  generateKeybindingFromSelectionItem,
  isDestroyAction,
  type Keybinding,
} from "../../core/keybinding/keybinding";
import { actionHandlers } from "../../core/keybinding/actionHandler";

export interface SelectableListProps {
  sectionType: SectionType;
  sectionHeader: string;
  handleSelect: (index: number, item: SelectableItem | null) => void;
  handleOnChange: (index: number, item: SelectableItem | null) => void;
  handleReadme: () => void;
  data: SelectableItem[];
  focoused: boolean;
}

export const converSelectableItemToSelectOption = (
  item: SelectableItem,
): SelectOption => {
  return {
    name:
      item.kind === SelectableItemsTypes.SESSION && item.data.isCurrent
        ? `🟢 ${item.data.name} (attached)`
        : item.data.name,
    description: "",
    value: item,
  };
};

export function SelectableList({
  sectionType,
  sectionHeader,
  handleSelect,
  handleOnChange,
  handleReadme,
  data: items,
  focoused = false,
}: SelectableListProps) {
  // const [data, setData] = useState<SelectableItem[]>();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [selectionKeybinding, setSelectionKeybinding] =
    useState<Keybinding | null>(null);

  // const refetch = async () => {
  //   const apiCall: () => Promise<SelectableItem[]> =
  //     sectionType === Tabs.SESSIONS
  //       ? () =>
  //           api
  //             .getSessions()
  //             .then((sessions) => sessions.map(sessionToSelectable))
  //       : () =>
  //           api
  //             .getProjects()
  //             .then((projects) => projects.map(projectToSelectable));
  //
  //   apiCall()
  //     .then((items) => {
  //       setData(items);
  //       if (!items) return;
  //       handleOnChange(
  //         selectedIdx,
  //         converSelectableItemToSelectOption(
  //           items[selectedIdx == items.length ? selectedIdx - 1 : selectedIdx]!,
  //         ),
  //       );
  //       setSelectionKeybinding(
  //         generateKeybindingFromSelectionItem(
  //           items[selectedIdx == items.length ? selectedIdx - 1 : selectedIdx]!,
  //         ),
  //       );
  //     })
  //     .catch(console.error);
  // };

  // useKeyboard((key: KeyEvent) => {
  //   if (!data) return;
  //   if (focoused) {
  //     selectionKeybinding?.map(async (keymap) => {
  //       if (key.name === keymap.key) {
  //         if (keymap.action === Action.FOCUS_ON_README) {
  //           handleReadme();
  //           return;
  //         }
  //         // this means that the list is becoming shorter, if we are on the last item,
  //         // we need to dec the selected index by 1
  //         if (
  //           isDestroyAction(keymap.action) &&
  //           data &&
  //           selectedIdx === data?.length - 1
  //         )
  //           // updating index
  //           setSelectedIdx(selectedIdx - 1);
  //         // executing
  //         await actionHandlers[keymap.action]({
  //           name: data![selectedIdx]?.name!,
  //         });
  //         // updating data
  //         await refetch();
  //       }
  //     });
  //   }
  // });

  const onFocous = () => {
    if (!focoused) return;
    if (!items[selectedIdx]) return;
    handleOnChange(selectedIdx, items[selectedIdx]);
  };

  useEffect(() => {
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
