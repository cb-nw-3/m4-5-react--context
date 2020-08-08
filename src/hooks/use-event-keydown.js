import React from "react";

const useKeyDown = ({ pressedKey, callbackFunction }) => {
    React.useEffect(() => {
        const handleKeyDown = (ev) => {
            if (ev.code === pressedKey) {
                callbackFunction();
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });
}

export default useKeyDown;