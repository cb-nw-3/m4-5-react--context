import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import useInterval from "../hooks/use-interval.hook";
import { GameContext } from "./GameContext";

import Home from "./Home";
import Game from "./Game";

function App(props) {
  const { numCookies, setNumCookies, cookiesPerSec } = React.useContext(
    GameContext
  );

  useInterval(() => {
    setNumCookies(numCookies + cookiesPerSec);
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
