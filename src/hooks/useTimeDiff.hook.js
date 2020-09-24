import React from "react";

export default function useTimeDiff() {
  let dateNow = new Date().getTime();
  const lastDate = JSON.parse(localStorage.getItem("timeClocked")) || dateNow;
  let timeDiffInSec = Math.floor(dateNow - lastDate / 1000);
  return timeDiffInSec;
}
