import React from "react";

const useKeyDown = (code, callback) => {
  React.useEffect(() => {
    const handleKeyDown = (ev) => {
      ev.stopPropagation();
      console.log("in window event");
      if (ev.code === code) {
        callback();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
};

export default useKeyDown;
