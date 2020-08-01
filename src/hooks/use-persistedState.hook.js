import React, { useEffect } from "react";

const usePersistedState = (defValue, keyString) => {
  const [value, setValue] = React.useState(() => {
    let loadedValue = localStorage.getItem(keyString);

    if (loadedValue !== null) {
      return JSON.parse(loadedValue);
    } else {
      return defValue;
    }
  });

  React.useEffect(() => {
    localStorage.setItem(keyString, JSON.stringify(value));
  }, [keyString, value]);

  return [value, setValue];
};

export default usePersistedState;
