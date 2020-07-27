import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc, { ReactComponent } from "../cookie.svg";
import Item from "./Item";

import useInterval from "../hooks/use-interval.hook";
import useKeydown from "../hooks/use-keydown.hook";
import useDocumentTitle from "../hooks/use-documentTitle.hook";

const items = [
  {
    id: "cursor",
    name: "Cursor",
    type: "cps",
    basePrice: 10,
    cost: 10,
    value: 1,

    growth: 1.2,
  },
  {
    id: "grandma",
    name: "Grandma",
    type: "cps",
    basePrice: 100,
    cost: 100,
    value: 10,
    growth: 1.15,
  },
  {
    id: "farm",
    name: "Farm",
    type: "cps",
    basePrice: 1000,
    cost: 1000,
    value: 80,
    growth: 1.12,
  },
  {
    id: "megaCursor",
    name: "Mega Cursor",
    type: "cursor",
    basePrice: 50,
    cost: 50,
    value: 0,
    growth: 1.3,
  },
];

const Game = () => {
  const [numCookies, setNumCookies] = React.useState(0);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0,
  });

  const cookiesPerClick = purchasedItems.megaCursor + 1;

  const addCookie = () => {
    setNumCookies(numCookies + cookiesPerClick);
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
