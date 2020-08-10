import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import useInterval from "../hooks/use-interval.hook";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from '../data';

function App(props) {
  if (localStorage.getItem('numCookies') === 'undefined') {
    localStorage.setItem('numCookies', 1000);
    localStorage.setItem('cursorOwned', 0);
    localStorage.setItem('grandmaOwned', 0);
    localStorage.setItem('farmOwned', 0);
  }
  const [numCookies, setNumCookies] = React.useState(Number(localStorage.getItem('numCookies')));
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: Number(localStorage.getItem('cursorOwned')),
    grandma: Number(localStorage.getItem('grandmaOwned')),
    farm: Number(localStorage.getItem('farmOwned')),
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
