import React from "react";
import calculateCookiesPerSecond from "./CalculateCookiesPerSecond";
import useSavedState from "../hooks/use-saved-state.hook";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = useSavedState("numCookies", 1000);

  const [purchasedItems, setPurchasedItems] = useSavedState("purhasedItems", {
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

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
