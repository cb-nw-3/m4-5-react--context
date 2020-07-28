import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from './data';
import useInterval from "../hooks/use-interval.hook";

const calculateCookiesPerSecond = (purchasedItems) => {
  console.log(Object.values(purchasedItems));
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find((item) => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};
// localStorage.clear();
function App(props) {
  const initItems = {
      cursor: 0,
      grandma: 0,
      farm: 0,
    };
  const [numCookies, setNumCookies] = React.useState(
    Number(localStorage.getItem('myNumCookies')) || 1000
  );
  const [purchasedItems, setPurchasedItems] = React.useState(
    JSON.parse(localStorage.getItem('myPurchasedItems')) || initItems);

  React.useEffect(() => {
    localStorage.setItem('myNumCookies', numCookies);
  }, [numCookies])
  


  React.useEffect(() => {
    localStorage.setItem('myPurchasedItems', JSON.stringify(purchasedItems));
  }, [purchasedItems])
  // const onChange = event => {setNumCookies};

  

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
  const cookiesPerSecond = calculateCookiesPerSecond(purchasedItems);
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
