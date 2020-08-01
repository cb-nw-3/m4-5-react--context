import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

import { GameContext } from './GameContext';

function App(props) {
  const { numCookies, setNumCookies, purchasedItems, setPurchasedItems } = React.useContext(
    GameContext
  );

  // get stored data after render
  React.useEffect(() => {
    const memoryCookies = localStorage.getItem('numOfCookies');
    const memoryItems = localStorage.getItem('numOfItems');
    // update state if data not empty
    if (memoryCookies) {
      setNumCookies(JSON.parse(memoryCookies));
    }
    if (memoryItems) {
      setPurchasedItems(JSON.parse(memoryItems))
    }
  }, [setNumCookies, setPurchasedItems]);
  // create/update stored data after render
  React.useEffect(() => {
    localStorage.setItem('numOfCookies', JSON.stringify(numCookies));
    localStorage.setItem('numOfItems', JSON.stringify(purchasedItems));
  });

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
