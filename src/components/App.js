import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useInterval from "../hooks/use-interval.hook";
import { GameContext } from "./GameContext";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

function App(props) {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    calculateCookiesPerTick,
  } = React.useContext(GameContext);

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
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
