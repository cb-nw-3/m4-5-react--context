import React from "react";

export default function useKeydown(code, callback) {
  React.useEffect(() => {
    const handleKeydown = (ev) => {
      if (ev.code === 32) {
        callback(ev);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
}
