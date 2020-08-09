import React from "react";

export default function useLocalStorage(initialValue, name) {
  const storageValue = JSON.parse(localStorage.getItem(name));

  const [stateValue, setStateValue] = React.useState(
    storageValue || initialValue
  );

  React.useEffect(() => {
    localStorage.setItem(name, JSON.stringify(stateValue));
  }, [name, stateValue]);

  return [stateValue, setStateValue];
}
