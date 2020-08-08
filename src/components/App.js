import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useLocalStorage from "../hooks/use-local-storage.hook";
import useInterval from "../hooks/use-interval.hook";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data";

function App(props) {
  const [numCookies, setNumCookies] = useLocalStorage(1000, "cookies");

  const startingItems = {
    cursor: 0,
    grandma: 0,
    farm: 0,
  };

  const [purchasedItems, setPurchasedItems] = useLocalStorage(
    startingItems,
    "items"
  );

  const calculateCookiesPerTick = (purchasedItems) => {
    let totalCookies = 0;
    //loop over purchased items
    Object.keys(purchasedItems).forEach((purchasedItem) => {
      //get individual purchased item amount
      let purchasedItemAmount = purchasedItems[purchasedItem];
      //Look through items for the purchased item and get the value
      let findItem = items.find((item) => {
        return item.id === purchasedItem;
      });
      //Individual purchase item and times it by the value of that item
      totalCookies += purchasedItemAmount * findItem.value;
    });
    return totalCookies;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems}
            calculateCookiesPerTick={calculateCookiesPerTick}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
