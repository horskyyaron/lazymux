import { createCliRenderer, type TextareaRenderable } from "@opentui/core";
import { createRoot, useKeyboard, useRenderer } from "@opentui/react";
import { useEffect, useRef } from "react";

function App() {
  const renderer = useRenderer();
  const textareaRef = useRef<TextareaRenderable>(null);

  useEffect(() => {
    renderer.console.show();
  }, [renderer]);

  useKeyboard((key) => {
    if (key.name === "i") {
      key.preventDefault();
      textareaRef.current?.focus();
      return;
    }
    if (key.name === "return") {
      if (!textareaRef.current?.focused) return;
      console.log(textareaRef.current?.plainText);
      textareaRef.current?.blur();
    }
  });

  return (
    <box title="Interactive Editor" style={{ border: true, flexGrow: 1 }}>
      <textarea ref={textareaRef} placeholder="Type here..." focused />
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
