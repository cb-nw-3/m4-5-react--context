import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from './data';
import useInterval from "../hooks/use-interval.hook";


// localStorage.clear();
function App(props) {
  
  const incrementCookies = () => {
    setNumCookies((c) => c + 1);
  };  
  
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
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
  // const cookiesPerSecond = calculateCookiesPerSecond(purchasedItems);
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
          items={items}
          cookiesPerSecond={cookiesPerSecond}
          purchasedItems={purchasedItems}
          setPurchasedItems={setPurchasedItems}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
