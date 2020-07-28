import React from "react";
import items from "../data";

export default function useLocalStorage(initialValue, id) {
    const storageValue = JSON.parse(localStorage.getItem(id));
    const [stateValue, setStateValue] = React.useState(storageValue || initialValue);
    React.useEffect(() => {
        localStorage.setItem(id, JSON.stringify(stateValue));
    }, [stateValue]);

    return [stateValue, setStateValue];
}

