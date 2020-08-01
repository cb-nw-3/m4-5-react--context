import React from "react";

export default function usePersistedState(defaultValue, item) {
  let value = localStorage.getItem("item");
  if (value) {
    return value;
  } else {
    return defaultValue;
  }
}
