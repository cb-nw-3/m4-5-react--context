import React from "react";

export default function handleGenericKeyPress(code, callback) {
  React.useEffect(() => {
    console.log("test is done");
  });
  React.useEffect(() => {
    const handleKeydown1 = (ev) => {
      if (ev.code === code) {
        callback(ev);
      }
    };
    window.addEventListener("keydown", handleKeydown1);
    return () => {
      window.removeEventListener("keydown", handleKeydown1);
    };
  });
}
