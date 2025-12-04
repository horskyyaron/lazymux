import { createCliRenderer } from "@opentui/core";
import {
  createRoot,
  useKeyboard,
  useRenderer,
  useOnResize,
  useTerminalDimensions,
} from "@opentui/react";
import { useEffect, useState } from "react";

function App() {
  const { height, width } = useTerminalDimensions();
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const renderer = useRenderer();
  useKeyboard(
    (event) => {
      setPressedKeys((keys) => {
        const newKeys = new Set(keys);
        if (event.eventType === "release") {
          newKeys.delete(event.name);
        } else {
          newKeys.add(event.name);
        }
        return newKeys;
      });
    },
    { release: true },
  );

  useEffect(() => {
    renderer.console.show();
    console.log("hello");
  }, []);

  useOnResize((width, height) => {
    console.log(`Terminal resized to ${width}x${height}`);
  });

  return (
    <box>
      <text>
        terminal dimensions: {width} : {height}
      </text>
      <box
        style={{
          width: Math.floor(width / 2),
          height: Math.floor(height / 3),
          border: true,
        }}
      >
        <text>1/2 width, 1/3 size</text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
