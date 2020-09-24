import React from "react";
import useGeneric from "../hooks/useGeneric";

const GameContext = React.createContext(null);

const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = useGeneric(
    "myNumCookiesInLocalStorage",
    900
  );
  const [purchasedItems, setPurchasedItems] = useGeneric(
    "myPurchasedItemsInLocalStorage",
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    }
  );

  return (
    <GameContext.Provider
      value={{ numCookies, setNumCookies, purchasedItems, setPurchasedItems }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
