import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import useInterval from "../hooks/use-interval.hook";

import useSavedState from "../hooks/use-saved-state.hook";
import calculateCookiesPerSecond from "./CalculateCookiesPerSecond";

function App(props) {
  const [numCookies, setNumCookies] = useSavedState("numCookies", 1000);

  const [purchasedItems, setPurchasedItems] = useSavedState("purhasedItems", {
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

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
          <Game
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
