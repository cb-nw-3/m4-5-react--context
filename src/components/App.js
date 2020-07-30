import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import usePersistedState from "../hooks/use-persistedState.hook";

import Home from "./Home";
import Game from "./Game";

function App(props) {
  const [numCookies, setNumCookies] = usePersistedState(0, "num-cookies");
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    { cursor: 0, grandma: 0, farm: 0, portal: 0, megaCursor: 0 },
    "purchased-items"
  );

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home numCookies={numCookies} />
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
