import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setNumCookies] = React.useState(100);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const calculateCookiesPerTick = (purchasedItems) => {
    let totalCookies = 0;
    console.log(purchasedItems);
    //loop over purchased items
    Object.keys(purchasedItems).forEach((purchasedItem) => {
      //get individual purchased item amount
      let purchasedItemAmount = purchasedItems[purchasedItem];
      //Look through items for the purchased item and get the value
      let findItem = items.find((item) => {
        return item.id === purchasedItem;
      });
      //Individual purchase item and times it by the value of that item
      totalCookies += purchasedItemAmount * findItem.value;
    });
    return totalCookies;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  React.useEffect(() => {
    document.title = `${numCookies} cookies | Cookie Game`;
    return () => {
      document.title = `Cookie Game`;
    };
  }, [numCookies]);

  const handleKeyPress = (ev) => {
    if (ev.key === 32) {
      setNumCookies(numCookies + 1);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keyPress", handleKeyPress);

    return () => {
      window.removeEventListener("keyPress", handleKeyPress);
    };
  }, [numCookies]);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
        </Indicator>
        <Button
          onClick={() => {
            setNumCookies(numCookies + 1);
          }}
        >
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              name={item.name}
              numOwned={purchasedItems}
              handleClick={() => {
                if (item.cost > numCookies) {
                  window.alert(
                    "You don't have enough cookies to buy this item!"
                  );
                  return;
                } else {
                  setNumCookies(numCookies - item.cost);
                  purchasedItems[item.id] += 1;
                  setPurchasedItems(purchasedItems);
                }
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
