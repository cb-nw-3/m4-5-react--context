import React from "react";
import items from "../data";
import useLocalStorage from "../hooks/use-local-storage";

import useKeyDown from "../hooks/use-event-keydown";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = useLocalStorage(1000, 'cookies');

    const initialItems = {
        cursor: 0,
        grandma: 0,
        farm: 0,
    }

    const [purchasedItems, setPurchasedItems] = useLocalStorage(initialItems, 'items');

    const clearData = () => {
        localStorage.clear();
        setNumCookies(10);
        setPurchasedItems({
            cursor: 0,
            grandma: 0,
            farm: 0,
        });
    };
    useKeyDown({
        pressedKey: "Delete",
        callbackFunction: clearData,
    })

    const calculateCookiesPerSecond = (purchasedItems) => {
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
            const numOwned = purchasedItems[itemId];
            const item = items.find((item) => item.id === itemId);
            const value = item.value;

            return acc + value * numOwned;
        }, 0);
    };

    return (
        <GameContext.Provider value={{
            numCookies,
            setNumCookies,
            purchasedItems,
            setPurchasedItems,
            cookiesPerSecond: calculateCookiesPerSecond(purchasedItems),
        }}>
            {children}
        </GameContext.Provider>
    );
};