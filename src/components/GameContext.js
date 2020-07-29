import React from "react";

// #### UTILITIES #####
import { calculateCookiesPerSecond } from "../utils";

// #### HOOKS ####
import usePersistedState from "../hooks/use-PersistedState.hook";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  //####################### STATES #############################
  // const [numCookies, setNumCookies] = usePersistedState(1000, "totalCookies");

  // const [purchasedItems, setPurchasedItems] = usePersistedState(
  //   {
  //     cursor: 0,
  //     grandma: 0,
  //     farm: 0,
  //   },
  //   "allPurchasedItems"
  // );

  return (
    <GameContext.Provider
      value={{
        calculateCookiesPerSecond,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
