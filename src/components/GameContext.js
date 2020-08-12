import React from "react";
import items from '../data';

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
    if (localStorage.getItem('numCookies') === 'undefined') {
        localStorage.setItem('numCookies', 1000);
        localStorage.setItem('cursorOwned', 0);
        localStorage.setItem('grandmaOwned', 0);
        localStorage.setItem('farmOwned', 0);
    }
    const [numCookies, setNumCookies] = React.useState(Number(localStorage.getItem('numCookies')));

    const [purchasedItems, setPurchasedItems] = React.useState({
        cursor: Number(localStorage.getItem('cursorOwned')),
        grandma: Number(localStorage.getItem('grandmaOwned')),
        farm: Number(localStorage.getItem('farmOwned')),
    });

    const calculateCookiesPerSecond = (purchasedItems) => {
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
        const numOwned = purchasedItems[itemId];
        const item = items.find((item) => item.id === itemId);
        const value = item.value;
    
          return acc + value * numOwned;
        }, 0);
    };
    
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    return(
        <GameContext.Provider value={{
            numCookies,
            setNumCookies,
            purchasedItems,
            setPurchasedItems,
            calculateCookiesPerSecond,
            numOfGeneratedCookies,
        }}>
            {children}
        </GameContext.Provider>
    )
};