import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import useGeneric from "../hooks/useGeneric";
import { useEffect } from "react";
import { calculateCookiesPerSecond } from "../utils";
import useInterval from "../hooks/use-interval.hook";
import { GameContext } from "./GameContext";
let dateSet = new Date();
function App(props) {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
  } = React.useContext(GameContext);

  useInterval(() => {
    console.log("numOfGeneratedCookies: ", purchasedItems);
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
    console.log(
      "numOfGeneratedCookies in use interval: ",
      numOfGeneratedCookies
    );
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  useEffect(() => {
    let dateNow = new Date().getTime();
    const lastDate = JSON.parse(localStorage.getItem("timeClocked")) || dateNow;
    let timeDiffInSec = Math.floor((dateNow - lastDate) / 1000);
    const numCookieSecIncrement =
      calculateCookiesPerSecond(purchasedItems) * timeDiffInSec;
    console.log("numCookieSecIncrement before: ", numCookies);
    setNumCookies(numCookieSecIncrement + numCookies);
    console.log(
      "numCookieSecIncrement after: ",
      numCookieSecIncrement + numCookies
    );
    // console.log("timeDiffInSec: ", timeDiffInSec);
    // console.log("numCookieSecIncrement: ", numCookieSecIncrement);
    // console.log("timeDiffInSec: ", timeDiffInSec);
    // console.log(
    //   "calculateCookiesPerSecond(purchasedItems): ",
    // calculateCookiesPerSecond(purchasedItems)
    // );
    const onbeforeunloadFn = () => {
      let dateSet = new Date();
      localStorage.setItem("timeClocked", JSON.stringify(dateSet.getTime()));
    };
    window.addEventListener("beforeunload", onbeforeunloadFn);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunloadFn);
    };
  }, []);

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
