import React from "react";

const useSavedState = (name, defaultValue) => {
  const [value, setValue] = React.useState(() => {
    const savedStateValue = window.localStorage.getItem(name);

    return savedStateValue !== null
      ? JSON.parse(savedStateValue)
      : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  return [value, setValue];
};

export default useSavedState;
