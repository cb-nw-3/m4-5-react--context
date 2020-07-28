import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import { GameContext } from "./GameContext";

import useInterval from "../hooks/use-interval.hook";

function App(props) {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    calculateCookiesPerSecond,
  } = React.useContext(GameContext);

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  React.useEffect(() => {
    const storedNumCookies = localStorage.getItem("numCookies");
    const storedPurchasedItems = localStorage.getItem("purchasedItems");
    if (storedNumCookies) {
      setNumCookies(JSON.parse(storedNumCookies));
    }
    if (purchasedItems) {
      setPurchasedItems(JSON.parse(storedPurchasedItems));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("numCookies", JSON.stringify(numCookies));
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  });

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
