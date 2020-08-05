import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { CookieContextProvider } from "./CookieContext";
const rootElement = document.getElementById("root");
// reset if we want to
// window.localStorage.setItem("numCookies", JSON.stringify(100));
// window.localStorage.setItem(
//   "purchasedItems",
//   JSON.stringify({
//     cursor: 0,
//     grandma: 0,
//     farm: 0,
//     megaCursor: 0,
//   })
// );

let initial_cookies = window.localStorage.getItem("numCookies");

let last_date_stored = window.localStorage.getItem("lastDateStored");
let initPurchasedItems = window.localStorage.getItem("purchasedItems");
console.log({ initPurchasedItems });
let local = ["Dave"];
ReactDOM.render(
  <CookieContextProvider>
    <App
      initial_cookies={initial_cookies}
      last_date_stored={last_date_stored}
      initPurchasedItems={initPurchasedItems}
    />
  </CookieContextProvider>,
  rootElement
);
