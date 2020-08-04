import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useInterval from "../hooks/use-interval.hook";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

const calculateCookiesPerSecond = (purchasedItems) => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find((item) => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

function App(props) {
  const initNumCookies = localStorage.getItem("numCookies")
    ? parseInt(localStorage.getItem("numCookies"))
    : 1000;
  const initPurchased = localStorage.getItem("purchasedItems")
    ? JSON.parse(localStorage.getItem("purchasedItems"))
    : {
        cursor: 0,
        grandma: 0,
        farm: 0,
      };

  const [numCookies, setNumCookies] = React.useState(initNumCookies);

  const [purchasedItems, setPurchasedItems] = React.useState(initPurchased);

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);

    localStorage.setItem("numCookies", numCookies.toString());
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
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
            cookiesPerSecond={calculateCookiesPerSecond(purchasedItems)}
            items={items}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
