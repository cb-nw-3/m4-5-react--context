import React, { createContext, useState } from "react";
import usePersistedState from "./hooks/use-persisted-state.hook";

export const CookieContext = createContext();

export const CookieContextProvider = ({ children }) => {
  const [cookiesTotal, setCookiesTotal] = usePersistedState("numCookies", 1000);

  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
  const [cookiesPerClick, setCookiesPerClick] = useState(0);
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    "purchasedItems",
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
      megaCursor: 0,
    }
  );

  const [items, setItems] = useState({});

  function calculateCookiesPerTick() {
    let cursor_cookies = purchasedItems.cursor * 1;
    let grandma_cookies = purchasedItems.grandma * 10;
    let farm_cookies = purchasedItems.farm * 80;
    let cookies_earned = cursor_cookies + grandma_cookies + farm_cookies;

    setCookiesTotal(cookiesTotal + cookies_earned);
    setCookiesPerSecond(cookies_earned);
  }

  React.useEffect(() => {
    var today = new Date();
    window.localStorage.setItem("lastDateStored", JSON.stringify(today));
  }, [cookiesTotal]);

  return (
    <CookieContext.Provider
      value={{
        cookiesTotal,
        cookiesPerSecond,
        cookiesPerClick,
        purchasedItems,
        items,
        setCookiesTotal,
        setCookiesPerSecond,
        setItems,
        setPurchasedItems,
        setCookiesPerClick,
        calculateCookiesPerTick,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};
