import React from "react";

import items from "../data";
import usePersistedState from "../hooks/use-persisted-state.hook";
import useInterval from "../hooks/use-interval.hook";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState("numCookies", 1000);

  const [purchasedItems, setPurchasedItems] = usePersistedState(
    "purchasedItems",
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    }
  );

  const calculateCookiesPerSecond = (purchasedItems) => {
    const itemAmountArr = Object.values(purchasedItems);
    let totalCookies = 0;

    items.forEach((item) => {
      totalCookies += item.value * itemAmountArr[items.indexOf(item)];
    });

    return totalCookies;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
