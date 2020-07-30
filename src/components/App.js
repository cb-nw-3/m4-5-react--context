import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from './data';
import useInterval from "../hooks/use-interval.hook";
import { GameContext } from './GameContext';

// localStorage.clear();
function App() {
  const { 
    numCookies, 
    setNumCookies,
    cookiesPerSecond 
  } = React.useContext(GameContext);

  React.useEffect(() => {
    const localStorageTerm = localStorage.getItem('end-time');
    const lastTime = Number(localStorageTerm) || new Date().getTime();
    const currentTime = new Date().getTime();

    const timeElapsed = currentTime - lastTime;
    setNumCookies(numCookies + cookiesPerSecond * Math.floor(timeElapsed/1000));
    }, [])

  useInterval(() => {
    // const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + cookiesPerSecond);
  }, 1000);

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;

    return () => {
      document.title = "Cookie Clicker Workshop";
    };
  }, [numCookies]);

  

 



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
