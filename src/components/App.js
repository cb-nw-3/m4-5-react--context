import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "./data";

export const GameContext = React.createContext(null);

function App(props) {
  const [numCookies, setNumCookies] = React.useState(1000);

  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

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
    <GameContext.Provider
      value={{ numCookies, setNumCookies, purchasedItems, setPurchasedItems }}
    >
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </GameContext.Provider>
  );
}

export default App;
