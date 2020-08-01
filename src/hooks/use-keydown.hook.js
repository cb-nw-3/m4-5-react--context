import React, { useEffect } from "react";

const useKeydown = (code, callback) => {
  React.useEffect(() => {
    const handleKeydown = (ev) => {
      if (ev.code === code) {
        ev.preventDefault();
        callback(ev);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
};

export default useKeydown;
