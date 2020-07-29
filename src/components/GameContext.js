import React from "react";

// #### UTILITIES #####
// import { calculateCookiesPerSecond } from "../utils";

// #### HOOKS ####
import usePersistedState from "../hooks/use-PersistedState.hook";
import useDocumentTitle from "../hooks/use-documentTitle.hook";
import useHandleKeydown from "../hooks/use-handlekeydown.hook";

// #### DATA ####
import { items } from "../data";

// ######################### MAIN CONTEXT ############################

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  //############## STATES ###############
  //this will set the states for our entire app, whenever the context is called for it

  const [numCookies, setNumCookies] = usePersistedState(1000, "totalCookies");
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    },
    "allPurchasedItems"
  );

  // #### FUNCTIONS & HOOKS ####

  const incrementCookies = () => {
    setNumCookies((c) => c + 1);
  };

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  //##### RENDER CONTEXT ####
  return (
    <GameContext.Provider
      value={{
        items,
        calculateCookiesPerSecond,
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        incrementCookies,
        useDocumentTitle,
        useHandleKeydown,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
