import React from "react";
import useLocalStorage from "../hooks/use-local-storage.hook";
import useInterval from "../hooks/use-interval.hook";
import items from "../data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = useLocalStorage(1000, "cookies");

  const startingItems = {
    cursor: 0,
    grandma: 0,
    farm: 0,
  };

  const [purchasedItems, setPurchasedItems] = useLocalStorage(
    startingItems,
    "items"
  );

  const calculateCookiesPerTick = (purchasedItems) => {
    let totalCookies = 0;
    //loop over purchased items
    Object.keys(purchasedItems).forEach((purchasedItem) => {
      //get individual purchased item amount
      let purchasedItemAmount = purchasedItems[purchasedItem];
      //Look through items for the purchased item and get the value
      let findItem = items.find((item) => {
        return item.id === purchasedItem;
      });
      //Individual purchase item and times it by the value of that item
      totalCookies += purchasedItemAmount * findItem.value;
    });
    return totalCookies;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        calculateCookiesPerTick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
