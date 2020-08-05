import React, { createContext, useState } from "react";
import usePersistedState from "./hooks/use-persisted-state.hook";
// import daveVerUsePersistedState from "./hooks/daveVerUsePersistedState.hook";

export const CookieContext = createContext();

// This context provider is passed to any component requiring the context
export const CookieContextProvider = ({ children }) => {
  /// ->>> Ask TC why the daveVer isn't working

  // const [cookiesTotal, setCookiesTotal] = daveVerUsePersistedState(
  //   1000,
  //   "numCookies"
  // );

  const [cookiesTotal, setCookiesTotal] = usePersistedState("numCookies", 1000);

  // const [cookiesTotal, setCookiesTotal] = useState(100);
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
  // const [
  //   numCookiesPeristentValue,
  //   setNumCookiesPeristentValue,
  // ] = usePersistedState(100, "numCookies");

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
    // console.log(today);
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
        // numCookiesPeristentValue,
        setCookiesTotal,
        setCookiesPerSecond,
        setItems,
        setPurchasedItems,
        setCookiesPerClick,
        calculateCookiesPerTick,
        // setNumCookiesPeristentValue,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};
