import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data";
import { GameContext } from "./GameContext";
import useInterval from "../hooks/use-interval.hook";

//want cookie state to be in app and passed down to game

function App() {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    calculateCookiesPerSecond,
  } = React.useContext(GameContext);

  React.useEffect(() => {
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;
    localStorage.setItem("numCookies", numCookies);
    return () => {
      document.title = "Cookie Clicker Workshop";
    };
  }, [numCookies]);

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
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
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
