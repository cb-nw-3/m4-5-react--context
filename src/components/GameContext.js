import React from "react";
import useInterval from "../hooks/use-interval.hook";
import items from "./data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = React.useState(1000);

  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        calculateCookiesPerSecond,
        useInterval,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
