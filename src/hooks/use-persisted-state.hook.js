import React from "react";

export default function usePersistedState(name, defaultValue) {
  const [value, setValue] = React.useState(() => {
    const persistedValue =
      typeof window !== "undefined" && window.localStorage.getItem(name);

    if (persistedValue) {
      console.log("pval", persistedValue);
      return JSON.parse(persistedValue);
    } else {
      console.log("defVal", defaultValue);
      return defaultValue;
    }
    // return defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  return [value, setValue];
}
