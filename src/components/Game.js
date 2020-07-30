import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";

import cookieSrc, { ReactComponent } from "../cookie.svg";
import items from "../data";

import useInterval from "../hooks/use-interval.hook";
import useKeydown from "../hooks/use-keydown.hook";
import useDocumentTitle from "../hooks/use-documentTitle.hook";

const Game = ({
  numCookies,
  setNumCookies,
  purchasedItems,
  setPurchasedItems,
}) => {
  const cookiesPerClick = purchasedItems.megaCursor + 1;

  const addCookie = () => {
    setNumCookies(numCookies + cookiesPerClick);
  };

  const clearData = () => {
    localStorage.clear();
    setNumCookies(0);
    setPurchasedItems({
      cursor: 0,
      grandma: 0,
      farm: 0,
      portal: 0,
      megaCursor: 0,
    });
  };

  const setPrices = (array) => {
    array.forEach((item) => {
      let cost = item.basePrice * item.growth ** purchasedItems[item.id];

      const itemToUpdatePriceFor = items.find((entry) => entry.id === item.id);

      itemToUpdatePriceFor.cost = Math.floor(cost);
    });
  };

  setPrices(items);

  useDocumentTitle(`${numCookies} cookies - Cookie Clicker`, `Cookie Clicker`);

  useKeydown("Space", addCookie);
  useKeydown("KeyQ", clearData);

  const purchaseItem = (item) => {
    if (numCookies < item.cost) {
      return alert("Can't afford this item");
    } else {
      setNumCookies(numCookies - item.cost);
      setPurchasedItems({
        ...purchasedItems,
        [item.id]: purchasedItems[item.id] + 1,
      });
      calculateCookiesPerSec(purchasedItems);
    }
  };

  const calculateCookiesPerSec = (purchasedItems) => {
    let numOfGeneratedCookies = 0;

    items.forEach((item) => {
      numOfGeneratedCookies =
        numOfGeneratedCookies + purchasedItems[item.id] * item.value;
    });

    return numOfGeneratedCookies;
  };

  useInterval(() => {
    const cookiesPerSec = calculateCookiesPerSec(purchasedItems);
    setNumCookies(numCookies + cookiesPerSec);
  }, 1000);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerSec(purchasedItems)}</strong>{" "}
          {calculateCookiesPerSec(purchasedItems) === 1
            ? "cookie per second"
            : "cookies per second"}
          <div>
            <strong>{cookiesPerClick}</strong>{" "}
            {cookiesPerClick === 1 ? "cookie per click" : "cookies per click"}
          </div>
        </Indicator>
        <Button>
          <Cookie src={cookieSrc} onClick={addCookie} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((entry, index) => {
          let firstItem = false;
          if (index === 0) {
            firstItem = true;
          }
          console.log(entry, purchasedItems);
          return (
            <Item
              key={entry.id}
              item={entry}
              numOwned={purchasedItems[entry.id]}
              focusOnLoad={firstItem}
              handleClick={() => {
                purchaseItem(entry);
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
