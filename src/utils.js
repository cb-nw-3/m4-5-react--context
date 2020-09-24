import { items } from "./components/Game";
import Game from "./components/Game";
export const calculateCookiesPerSecond = (purchasedItems) => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find((item) => item.id === itemId);

    const value = item.value;
    return acc + value * numOwned;
  }, 0);
};
