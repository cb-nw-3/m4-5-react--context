import React from "react";
// we have to do the parse and stringify

export default function usePersistedState(name, defaultValue) {
  // returns a JSON parsed default value or whatever it found in storage as the initial state for useState
  const [value, setValue] = React.useState(() => {
    let storedValue;
    if (
      window.localStorage.getItem(name) === undefined ||
      window.localStorage.getItem(name) === null
    ) {
      return defaultValue;
    }

    storedValue = window.localStorage.getItem(name);

    try {
      let parsed = JSON.parse(storedValue);
      return parsed;
    } catch (e) {
      console.log("error in usePersistedState JSON Parsing");
      console.log(e);
      return defaultValue;
    }
  });

  React.useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  return [value, setValue];
}
