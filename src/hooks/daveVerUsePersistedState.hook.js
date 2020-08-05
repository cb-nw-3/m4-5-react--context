import React from "react";
// ok so this custom hook just returns a hook to the main react app???

export default function daveVerUsePersistedState(valueToStore, identifer) {
  const [value, setValue] = React.useState(() => {
    let initialValueFromPassedOrFromStorage;

    if (window.localStorage.getItem(identifer) !== undefined) {
      initialValueFromPassedOrFromStorage = window.localStorage.getItem(
        identifer
      );
    } else {
      initialValueFromPassedOrFromStorage = valueToStore;
    }
    return JSON.parse(initialValueFromPassedOrFromStorage);
  });

  React.useEffect(() => {
    window.localStorage.setItem(identifer, JSON.stringify(value));
  }, [identifer, value]);

  // take valueToStore//
  return [value, setValue];
}
