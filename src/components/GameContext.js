import React from 'react';
import items from './data';

export const GameContext = React.createContext(null);

export const GameProvider = ({
children }) => {
    const initItems = {
        cursor: 0,
        grandma: 0,
        farm: 0,
      };
    const [numCookies, setNumCookies] = React.useState(
      Number(localStorage.getItem('myNumCookies')) || 1000
    );
    const [purchasedItems, setPurchasedItems] = React.useState(
      JSON.parse(localStorage.getItem('myPurchasedItems')) || initItems);
  
    React.useEffect(() => {
      localStorage.setItem('myNumCookies', numCookies);
      localStorage.setItem('end-time', new Date().getTime());
    }, [numCookies])
  
    React.useEffect(() => {
      localStorage.setItem('myPurchasedItems', JSON.stringify(purchasedItems));
    }, [purchasedItems])
  
  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;
      
      return acc + value * numOwned;
    }, 0);
  };

    return (
      <GameContext.Provider 
        value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: 
        calculateCookiesPerSecond(purchasedItems),
        }}
      >
        {children}
      </GameContext.Provider>
    );
};