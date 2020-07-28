import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import itemsArray from "../data";
import useInterval from "../hooks/use-interval.hook";
import useStickyState from "../hooks/useStickyState.hook";

function App(props) {
  // const [numCookies, setNumCookies] = useStickyState(100, "numCookies");
  // const [purchasedItems, setPurchasedItems] = useStickyState(
  //   {
  //     cursor: 0,
  //     grandma: 0,
  //     farm: 0,
  //     megacursor: 0,
  //   },
  //   "purchasedItems"
  // );
  // const [cookiesPerClick, setCookiesPerClick] = React.useState(1);
  // const [items, setItems] = useStickyState(itemsArray, "items");

  // const calculateCookiesPerTick = (listOfItems) => {
  //   let total = 0;
  //   const filteredItems = items.filter((item) => {
  //     return item.type === "tick";
  //   });
  //   filteredItems.forEach((item) => {
  //     total += listOfItems[`${item.id}`] * item.value;
  //   });
  //   return total;
  // };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
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
          <Game
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems}
            cookiesPerClick={cookiesPerClick}
            setCookiesPerClick={setCookiesPerClick}
            items={items}
            setItems={setItems}
            calculateCookiesPerTick={calculateCookiesPerTick}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
