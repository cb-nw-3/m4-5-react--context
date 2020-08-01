import React from "react";

//this hook will add the keydown listener event when the component using the hook
//is rendered to activate the callback function

export default function useHandleKeydown(code, callback) {
  React.useEffect(() => {
    const handleKeydown = (ev) => {
      if (ev.code === code) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
}
