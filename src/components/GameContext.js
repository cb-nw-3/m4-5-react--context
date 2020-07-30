import React from "react";
import useInterval from "../hooks/use-interval.hook";
import items from "./data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const purchases = JSON.parse(localStorage.getItem("purchasedItems")) || {
    cursor: 0,
    grandma: 0,
    farm: 0,
  };

  const [purchasedItems, setPurchasedItems] = React.useState(purchases);

  const calculateCookiesPerSecond = (purchasedItems) => {
    const itemAmountArr = Object.values(purchasedItems);
    let totalCookies = 0;

    items.forEach((item) => {
      totalCookies += item.value * itemAmountArr[items.indexOf(item)];
    });

    return totalCookies;
  };

  const timeStamp = localStorage.getItem("timeStamp");
  const cookies = JSON.parse(localStorage.getItem("numCookies"));

  const currentTime = Date.now();

  const timeAwayInSeconds = Math.floor((currentTime - timeStamp) / 1000);
  console.log("time away", timeAwayInSeconds);
  const cookiesPerSecond = calculateCookiesPerSecond(purchases);
  let initialCookies = cookies + timeAwayInSeconds * cookiesPerSecond || 1000;

  const [numCookies, setNumCookies] = React.useState(initialCookies);

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
