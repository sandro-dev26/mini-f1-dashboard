import { useEffect } from "react";

interface ShortcutProps {
  onTrigger: () => void;
}

export default function ShortcutDeploy({ onTrigger }: ShortcutProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "F1") {
        event.preventDefault();
        onTrigger();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onTrigger]);
  return null;
}
