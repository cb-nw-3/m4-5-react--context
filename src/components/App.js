import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import { CookieContext } from "../CookieContext";
import useInterval from "../hooks/use-interval.hook";

let { items } = require("./data.js");

function calculateEarnedCookiesWhileDormant(initPurchasedItems, secondsGoneBy) {
  let cursor_cookies = initPurchasedItems.cursor * 1;
  let grandma_cookies = initPurchasedItems.grandma * 10;
  let farm_cookies = initPurchasedItems.farm * 80;
  let cookies_earning_power_per_tick =
    cursor_cookies + grandma_cookies + farm_cookies;
  let cookies_earned_while_dormant =
    cookies_earning_power_per_tick * secondsGoneBy;

  return cookies_earned_while_dormant;
}

function App({ initial_cookies, last_date_stored, initPurchasedItems }) {
  let cookieContext = React.useContext(CookieContext);

  useInterval(() => {
    cookieContext.calculateCookiesPerTick(cookieContext.purchasedItems);
  }, 1000);

  React.useEffect(() => {
    let parsed_date;
    try {
      parsed_date = JSON.parse(last_date_stored);
    } catch (e) {
      console.log("error in App Loading, date compares JSON Parsing");
      console.log(e);
    }

    let parsed_initPurchasedItems;
    try {
      parsed_initPurchasedItems = JSON.parse(initPurchasedItems);
    } catch (e) {
      console.log(
        "error in App Loading, initPurchasedItems compares JSON Parsing"
      );
      console.log(e);
    }

    let milliseconds_fom_stored_date = Date.parse(parsed_date);
    let milliseconds_fom_now = Date.parse(Date());
    let date_dif = milliseconds_fom_now - milliseconds_fom_stored_date;
    let seconds_gone_by_since_last_open = date_dif / 1000;

    let cookies_earned_since_last_play = calculateEarnedCookiesWhileDormant(
      parsed_initPurchasedItems,
      seconds_gone_by_since_last_open
    );

    cookies_earned_since_last_play = Math.floor(cookies_earned_since_last_play);
    if (cookies_earned_since_last_play > 0) {
      window.alert(
        `You earned ${cookies_earned_since_last_play} cookies while you were away doing... whatever else it is you were doing.`
      );
    }

    cookieContext.setCookiesTotal(
      cookieContext.cookiesTotal + cookies_earned_since_last_play
    );
  }, [initPurchasedItems]);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game items={items} />
        </Route>
      </Router>
    </>
  );
}

export default App;
