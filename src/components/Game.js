import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import useInterval from "../hooks/use-interval.hook";

import cookieSrc from "../cookie.svg";
import Item from "./Item";

import items from "../data";

const Game = ({ numCookies, setNumCookies, purchasedItems, setPurchasedItems }) => {

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  // ok. let's think this through.
  // essentially, all the data that we have is supposed to go into localStorage
  // so that it persists through tab closures, what-have-you, like the real cookie clicker
  // it needs to restore the cookies upon first load, but only once per session
  // SO! Can we check to see if the session exists? And if it exists, we load.

  if (!sessionStorage.getItem("cookieFirstLoad")) {
    sessionStorage.setItem("cookieFirstLoad", true);

    setNumCookies(Number(localStorage.getItem("numCookies")));
  }

  // second problem: we need to add the cookies we earned while off-page
  // suppose we could just do another logic check for date, and if it's less than a second, we skip
  // if we just put this in the main body, it re-renders a ton. we shold not do that.

  // put this in a useEffect with an empty dependency array
  // it will render once, but then since it's empty, it doesn't 'watch' anything

  React.useEffect(() => {

    let timeElapsed = Math.floor((new Date().getTime() - localStorage.getItem("lastUpdateTime")) / 1000);

    if (timeElapsed > 1) {
      setNumCookies(Number(localStorage.getItem("numCookies")) + Number(timeElapsed * calculateCookiesPerSecond(purchasedItems)));
    }
  }, [])

  const incrementCookies = () => {
    setNumCookies((c) => c + 1);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
    localStorage.setItem("numCookies", numCookies);
    let lastUpdateTime = new Date();
    localStorage.setItem("lastUpdateTime", lastUpdateTime.getTime());
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
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerSecond(purchasedItems)}</strong> cookies
          per second
        </Indicator>
        <Button onClick={incrementCookies}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return (
            <Item
              key={item.id}
              index={index}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems[item.id]}
              handleAttemptedPurchase={() => {
                if (numCookies < item.cost) {
                  alert("Cannot afford item");
                  return;
                }

                setNumCookies(numCookies - item.cost);
                setPurchasedItems({
                  ...purchasedItems,
                  [item.id]: purchasedItems[item.id] + 1,
                });
              }}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  transform-origin: center center;

  &:active {
    transform: scale(0.9);
  }
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
