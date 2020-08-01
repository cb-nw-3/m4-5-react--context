import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

import { GameContext } from './GameContext';

function App(props) {
  // grab GameContext data
  const { numCookies, setNumCookies, purchasedItems, setPurchasedItems, calculateCookiesPerSecond } = React.useContext(
    GameContext
  );
  // variables necessary to calculate the amount of cookies collected idle
  const lastTime = Math.round((JSON.parse(localStorage.getItem('timePassed'))) / 1000);
  const currentTime = Math.round(((Date.now())) / 1000);
  const localPurchasedItems = JSON.parse(localStorage.getItem('numOfItems'));
  const currentCookiesPerSecond = calculateCookiesPerSecond(localPurchasedItems);

  // get stored data after render
  React.useEffect(() => {
    const memoryCookies = localStorage.getItem('numOfCookies');
    const memoryItems = localStorage.getItem('numOfItems');

    console.log('memory', parseInt(memoryCookies))
    // update state if data not empty
    if (memoryCookies) {
      setNumCookies(parseInt(memoryCookies) + currentCookiesPerSecond * (currentTime - lastTime));
    }
    if (memoryItems) {
      setPurchasedItems(JSON.parse(memoryItems))
    }
  }, [setNumCookies, setPurchasedItems]);

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
