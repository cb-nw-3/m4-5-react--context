import React from "react";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = React.useState(1000);

  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  return (
    <GameContext.Provider
      value={{ numCookies, setNumCookies, purchasedItems, setPurchasedItems }}
    >
      {children}
    </GameContext.Provider>
  );
};
