import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import useInterval from "../hooks/use-interval.hook";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from '../data';

function App(props) {
  const [numCookies, setNumCookies] = React.useState(1000);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;
  
      return acc + value * numOwned;
    }, 0);
  };

  const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

  useInterval(() => {
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
          <Game numCookies={numCookies} 
                setNumCookies={setNumCookies}
                purchasedItems={purchasedItems}
                setPurchasedItems={setPurchasedItems}
                cookiesPerSecond={numOfGeneratedCookies}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
