import React, { createContext, useEffect } from "react";
import { items } from "../data";
import useInterval from "../hooks/use-interval.hook";

const GameContext = createContext(null);
//I am creating a game context with initial value null

const calculateCookiesPerSecond = (purchasedItems) => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find((item) => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = React.useState(() => {
    // state to have a stateful variable with initial value
    const cookieStored = localStorage.getItem("numCookies");
    if (cookieStored) {
      return JSON.parse(cookieStored);
      // reading if there exists value and then parsing
    } else {
      //if numCookies is not in localStorage , then set 1000 as default value
      return 1000;
    }
  });

  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  useEffect(() => {
    localStorage.setItem("numCookies", JSON.stringify(numCookies));
    //set is to put items in local storage and get to retrieve
    // we stringify when we send objects and then parse when we .getItem
  }, [numCookies]);

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        calculateCookiesPerSecond,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
