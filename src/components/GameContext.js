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

  // #### PERSISTENT TAB CALCULATIONS ####

  //this state will be set whenever a user closes the browser tab, it will
  //set the timestamp for this event.
  const [startTime, setStartTime] = usePersistedState(0, "startTime");

  //When the component mounts, return a timestamp t1, and when the component
  //unmounts because of the browser tab closing, it will store a timestamp t0
  //into local storage for retrieval and calculation
  React.useEffect(() => {
    const t0 = window.localStorage.getItem("startTime");
    const t1 = new Date().getTime();

    let duration = Math.floor((t1 - t0) / 1000);

    //Caclulate new number of cookies to add;
    const numOfGeneratedCookies =
      calculateCookiesPerSecond(purchasedItems) * duration;
    setNumCookies(numCookies + numOfGeneratedCookies);

    if (duration > 0) {
      window.alert(
        `You've earned ${numOfGeneratedCookies} cookies while you were gone for ${duration} seconds!`
      );
    }

    window.addEventListener("beforeunload", (ev) => {
      return setStartTime(new Date().getTime());
    });

    //no dependencies required, onle needs to run once at mount
  }, []);

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
