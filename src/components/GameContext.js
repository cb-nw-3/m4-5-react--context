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
    console.log(purchasedItems);
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  useInterval(() => {
    // console.log(purchasedItems);
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
        cookiesPerSecond: (purchasedItems) => {
          calculateCookiesPerSecond(purchasedItems);
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
