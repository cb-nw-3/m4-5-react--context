import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

function App(props) {
  // Exercise 1, copied from game.js
  // Added custom hook

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          {/* Exercise 1, created props */}
          <Game
          // gameItem={items}
          // numCookies={numCookies}
          // setNumCookies={setNumCookies}
          // purchasedItems={purchasedItems}
          // setPurchasedItems={setPurchasedItems}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
