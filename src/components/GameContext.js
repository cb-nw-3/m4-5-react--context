import React from "react";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const initNumCookies = localStorage.getItem("numCookies")
    ? parseInt(localStorage.getItem("numCookies"))
    : 1000;
  const initPurchased = localStorage.getItem("purchasedItems")
    ? JSON.parse(localStorage.getItem("purchasedItems"))
    : {
        cursor: 0,
        grandma: 0,
        farm: 0,
      };
  const [numCookies, setNumCookies] = React.useState(initNumCookies);

  const [purchasedItems, setPurchasedItems] = React.useState(initPurchased);
  return (
    <GameContext.Provider
      value={{
        numCookies: numCookies,
        setNumCookies: setNumCookies,
        purchasedItems: purchasedItems,
        setPurchasedItems: setPurchasedItems,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
