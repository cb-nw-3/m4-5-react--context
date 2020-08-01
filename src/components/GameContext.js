import React from "react";
import items from "../data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [purchasedItems, setPurchasedItems] = React.useState(() => {
    const data = localStorage.getItem("purchasedItems");
    return data ? JSON.parse(data) : { cursor: 0, grandma: 0, farm: 0 };
  });

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };
  const [numCookies, setNumCookies] = React.useState(() => {
    const lastTime = JSON.parse(localStorage.getItem("lastLogin"));
    const data = JSON.parse(localStorage.getItem("numCookies"));
    let timeElapsedSec = 0;
    const multiplier = calculateCookiesPerSecond(purchasedItems);

    if (lastTime) {
      const currentTime = new Date();
      const day = currentTime.getDate();
      const hours = currentTime.getHours();
      const min = currentTime.getMinutes();
      const sec = currentTime.getSeconds();

      timeElapsedSec =
        (day - lastTime.day) * 86400 +
        (hours - lastTime.hours) * 3600 +
        (min - lastTime.min) * 60 +
        (sec - lastTime.sec) * 1;
    }

    return data ? multiplier * timeElapsedSec + data : 1000;
  });

  React.useEffect(() => {
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;
    localStorage.setItem("numCookies", numCookies);
    const currentTime = new Date();
    const day = currentTime.getDate();
    const hours = currentTime.getHours();
    const min = currentTime.getMinutes();
    const sec = currentTime.getSeconds();

    let timeObj = { day, hours, min, sec };

    localStorage.setItem("lastLogin", JSON.stringify(timeObj));

    return () => {
      document.title = "Cookie Clicker Workshop";
    };
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
