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

  const calculateCookiesPerTick = () => {
    let total = 0;
    const filteredItems = items.filter((item) => {
      return item.type === "tick";
    });
    filteredItems.forEach((item) => {
      total += purchasedItems[`${item.id}`] * item.value;
    });
    return total;
  };

  React.useEffect(() => {
    const newDate = new Date();
    const newDateInMili = newDate.getTime();

    const oldMiliDateJSON = window.localStorage.getItem("dateInMili");
    if (oldMiliDateJSON !== null) {
      const oldMiliDate = JSON.parse(oldMiliDateJSON);
      const miliDifference = newDateInMili - oldMiliDate;
      console.log(miliDifference);
      const numOfTicks = Math.floor(miliDifference / 1000);
      if (numOfTicks > 0) {
        setNumCookies(numCookies + calculateCookiesPerTick() * numOfTicks);
      }
    }
  }, []);

  React.useEffect(() => {
    const date = new Date();
    const dateInMili = date.getTime();
    window.localStorage.setItem("dateInMili", JSON.stringify(dateInMili));
  });

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
