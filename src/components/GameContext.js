import React from "react";

import usePersistedState from "../hooks/use-persistedState.hook";

import items from "../data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState(0, "num-cookies");
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    { cursor: 0, grandma: 0, farm: 0, portal: 0, megaCursor: 0 },
    "purchased-items"
  );
  const [timeStamp, setTimeStamp] = usePersistedState(0, "timeStamp");

  const calculateCookiesPerSec = (purchasedItems) => {
    let numOfGeneratedCookies = 0;

    items.forEach((item) => {
      numOfGeneratedCookies =
        numOfGeneratedCookies + purchasedItems[item.id] * item.value;
    });

    return numOfGeneratedCookies;
  };

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSec: calculateCookiesPerSec(purchasedItems),
        timeStamp,
        setTimeStamp,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
