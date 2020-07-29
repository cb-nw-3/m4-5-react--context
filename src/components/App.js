import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// #### COMPONENTS ####
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

// #### DATA ####
import { items } from "../data";

// #### UTILITIES #####
import { calculateCookiesPerSecond } from "../utils";

// #### HOOKS ####

import usePersistedState from "../hooks/use-PersistedState.hook";

function App(props) {
  //####################### STATES #############################
  const [numCookies, setNumCookies] = usePersistedState(1000, "totalCookies");

  const [purchasedItems, setPurchasedItems] = usePersistedState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    },
    "allPurchasedItems"
  );

  //#################### RENDER APP ############################
  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game
            handleCookies={calculateCookiesPerSecond}
            gameItems={items}
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
