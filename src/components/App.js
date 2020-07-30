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
    localStorage.setItem("timeStamp", JSON.stringify(Date.now()));
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  });

  React.useEffect(() => {
    const timeStamp = localStorage.getItem("timeStamp");
    const cookies = JSON.parse(localStorage.getItem("numCookies"));
    const currentTime = Date.now();

    const timeAwayInSeconds = (timeStamp - currentTime) * 1000;
    const cookiesPerSecond = calculateCookiesPerSecond(purchasedItems);
    setNumCookies(cookies + timeAwayInSeconds * cookiesPerSecond);
  }, []);

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
