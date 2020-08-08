// Libraries
import React from 'react';
// Hooks
import usePersistedState from '../hooks/use-persisted-state.hook';
// Data
import items from '../data';

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = usePersistedState('cookies', 1000);

    const initialItems = {
        cursor: 0,
        grandma: 0,
        farm: 0,
    };

    const [purchasedItems, setPurchasedItems] = usePersistedState(
        'items',
        initialItems
    );

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
                calculateCookiesPerSecond,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
