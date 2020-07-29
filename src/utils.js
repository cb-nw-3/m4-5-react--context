//this function requires the state of purchastedItems and the { items } data
export const calculateCookiesPerSecond = (purchasedItems, gameItems) => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = gameItems.find((item) => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};
