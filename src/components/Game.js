import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import items from "../data";
import useKeydown from "../hooks/use-keydown.hook";
import { GameContext } from "./GameContext";

import cookieSrc from "../cookie.svg";

const Game = () => {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    calculateCookiesPerTick,
  } = React.useContext(GameContext);

  React.useEffect(() => {
    document.title = `${numCookies} cookies | Cookie Game`;
    return () => {
      document.title = `Cookie Game`;
    };
  }, [numCookies]);

  React.useEffect(() => {
    window.addEventListener("keyPress", useKeydown);

    return () => {
      window.removeEventListener("keyPress", useKeydown);
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
              numOwned={purchasedItems[item.id]}
              handleClick={() => {
                if (item.cost > numCookies) {
                  window.alert(
                    "You don't have enough cookies to buy this item!"
                  );
                  return;
                } else {
                  setNumCookies(numCookies - item.cost);
                  setPurchasedItems({
                    ...purchasedItems,
                    [item.id]: purchasedItems[item.id] + 1,
                  });
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
