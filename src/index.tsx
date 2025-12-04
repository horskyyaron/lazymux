import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";

function App() {
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
        <box border height={"50%"} title={"[1]-sessions"}></box>
        <box border height={"50%"} title={"[2]-projects"}></box>
      </box>
      <box
        border
        width={"70%"}
        title={"project's readme"}
        titleAlignment="center"
      ></box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
