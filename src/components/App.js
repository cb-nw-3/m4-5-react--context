import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import useInterval from "../hooks/use-interval.hook";
import useKeydown from "../hooks/use-keydown.hook";
import { GameContext } from "./GameContext";

import Home from "./Home";
import Game from "./Game";

function App(props) {
  const {
    numCookies,
    setNumCookies,
    cookiesPerSec,
    setPurchasedItems,
    timeStamp,
    setTimeStamp,
  } = React.useContext(GameContext);

  React.useEffect(() => {
    const currentTimeStamp = Math.floor(new Date().getTime() / 1000);
    const timeDifference = currentTimeStamp - timeStamp;
    console.log(currentTimeStamp, timeStamp);

    if (timeDifference >= 2) {
      setNumCookies(numCookies + timeDifference * cookiesPerSec);
      setTimeout(() => {
        window.alert(
          `Welcome back, you have been gone ${timeDifference} seconds, during which you produced ${
            timeDifference * cookiesPerSec
          } cookies`
        );
      }, 500);
    }
  }, []);

  const clearData = () => {
    localStorage.clear();
    setNumCookies(0);
    setTimeStamp(0);
    setPurchasedItems({
      cursor: 0,
      grandma: 0,
      farm: 0,
      portal: 0,
      megaCursor: 0,
    });
  };
  useKeydown("KeyQ", clearData);

  useInterval(() => {
    setNumCookies(numCookies + cookiesPerSec);
    setTimeStamp(Math.floor(new Date().getTime() / 1000));
  }, 1000);

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
