import React from "react";

// Exercise 2 Took from App.js
import items from "./Data";

import useStickyState from "../hooks/use-persisting";
// Exercise 3 Added import
import useInterval from "../hooks/use-interval.hook";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  // Moved from app.js
  const [numCookies, setNumCookies] = useStickyState(1000, "cookies");

  const [purchasedItems, setPurchasedItems] = useStickyState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    },
    "items"
  );

  return (
    <GameContext.Provider
      value={{
        items,
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        // Exercise 3. Added function
        useInterval,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
