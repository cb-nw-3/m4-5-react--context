import React from "react";
import useTimeDiff from "./useTimeDiff.hook";
const useGeneric = (key, defaultValue) => {
  const [state, setState] = React.useState(
    JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  console.log("get time: ", state);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
export default useGeneric;
