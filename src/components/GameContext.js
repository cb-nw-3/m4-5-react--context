import React from "react";
import useStickyState from "../hooks/useStickyState.hook";
import itemsArray from "../data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = useStickyState(100, "numCookies");
  const [purchasedItems, setPurchasedItems] = useStickyState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
      megacursor: 0,
    },
    "purchasedItems"
  );
  const [cookiesPerClick, setCookiesPerClick] = React.useState(1);
  const [items, setItems] = useStickyState(itemsArray, "items");

  const calculateCookiesPerTick = (listOfItems) => {
    let total = 0;
    const filteredItems = items.filter((item) => {
      return item.type === "tick";
    });
    filteredItems.forEach((item) => {
      total += listOfItems[`${item.id}`] * item.value;
    });
    return total;
  };

  return (
    <GameContext.Provider
      value={{
        numCookies: numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerClick,
        setCookiesPerClick,
        items,
        setItems,
        calculateCookiesPerTick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
