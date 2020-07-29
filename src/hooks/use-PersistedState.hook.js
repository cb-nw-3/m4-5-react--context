import React from "react";

//This custom hook was taken from
//https://joshwcomeau.com/react/persisting-react-state-in-localstorage/

//takes 2 arguments, key is the variable that will be stored on the browser, and
//defaultValue should be the React state that we want to persistently store.
//the useEffect() will update the page with the stored variables once the component
//renders by returning the state.

export default function usePersistedState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
