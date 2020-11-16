import React, { createContext, useEffect } from 'react';
import { items } from '../data';
import useInterval from '../hooks/use-interval.hook';

const GameContext = createContext(null);

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
    const cookieStored = localStorage.getItem('cookies');
    if (cookieStored) {
      return JSON.parse(cookieStored);
    } else {
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
    localStorage.setItem('cookies', JSON.stringify(numCookies));
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
