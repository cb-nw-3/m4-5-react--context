import React from 'react';

const { items } = require('../data');

export const GameProvider = ({ children }) => {
  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;
  
      return acc + value * numOwned;
    }, 0);
  };

  const [numCookies, setNumCookies] = React.useState(1000);

  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  
  // locally stored data for futur use
  React.useEffect(() => {
    localStorage.setItem('numOfCookies', JSON.stringify(numCookies));
    localStorage.setItem('numOfItems', JSON.stringify(purchasedItems));
    localStorage.setItem('timePassed', JSON.stringify(Date.now()));
  })

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
  )
};

export const GameContext = React.createContext(null);