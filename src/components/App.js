import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { GameContext } from "./GameContext";
import useInterval from "../hooks/use-interval.hook";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";


function App(props) {
  const {numCookies,
    setNumCookies,
    purchasedItems,
    numOfGeneratedCookies
  } = React.useContext(GameContext);

  useInterval(() => {
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  useEffect(() => {
    localStorage.setItem('numCookies', numCookies);
    localStorage.setItem('cursorOwned', purchasedItems.cursor);
    localStorage.setItem('grandmaOwned', purchasedItems.grandma);
    localStorage.setItem('farmOwned', purchasedItems.farm);
  })

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game/>
        </Route>
      </Router>
    </>
  );
}

export default App;
