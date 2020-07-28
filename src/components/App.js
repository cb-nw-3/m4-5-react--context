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

  const incrementCookies = () => {
    setNumCookies((c) => c + 1);
  };  

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

  React.useEffect(() => {
    const handleKeydown = (ev) => {
      if (ev.code === "Space") {
        incrementCookies();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

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
