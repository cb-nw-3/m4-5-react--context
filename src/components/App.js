import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useInterval from "../hooks/use-interval.hook";
import { GameContext } from "./GameContext";

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
  const data = React.useContext(GameContext);

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(
      data.purchasedItems
    );

    data.setNumCookies(data.numCookies + numOfGeneratedCookies);

    localStorage.setItem("numCookies", data.numCookies.toString());
    localStorage.setItem("purchasedItems", JSON.stringify(data.purchasedItems));
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
            numCookies={data.numCookies}
            setNumCookies={data.setNumCookies}
            purchasedItems={data.purchasedItems}
            setPurchasedItems={data.setPurchasedItems}
            cookiesPerSecond={calculateCookiesPerSecond(data.purchasedItems)}
            items={items}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
