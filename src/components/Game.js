import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import items from "../data";
import Item from "./Item";
import { GameContext } from "./GameContext";

import useKeyDown from "../hooks/use-event-keydown";

const Game = () => {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    cookiesPerSecond,
    cost,
    setCost
  } = React.useContext(GameContext)
  const incrementCookies = () => {
    setNumCookies((c) => c + 1);
  };

  //Add a global event listener
  useKeyDown({
    pressedKey: "Space",
    callbackFunction: incrementCookies,
  })

  React.useEffect(() => {
    document.title = `${Math.round(numCookies * 10) / 10} ${numCookies === 1 ? 'cookie' : 'cookies'} - Cookie Clicker Workshop`;

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
          <Total>{Math.round(numCookies * 10) / 10} {numCookies === 1 ? 'cookie' : 'cookies'}</Total>
          <strong>{Math.round(cookiesPerSecond * 10) / 10}</strong> cookies
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
              cost={cost[item.id]}
              value={item.value}
              numOwned={purchasedItems[item.id]}
              handleAttemptedPurchase={() => {
                if (numCookies < cost[item.id]) {
                  alert("You don't have enought cookies!");
                  return;
                }

                setNumCookies(numCookies - cost[item.id]);
                setPurchasedItems({
                  ...purchasedItems,
                  [item.id]: purchasedItems[item.id] + 1,
                });
                setCost({
                  ...cost,
                  [item.id]: Math.floor(cost[item.id] * 1.2),
                })
              }}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (min-width: 600px){
    flex-direction: row;
  }
`;

const GameArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  place-items: center;

  @media (min-width: 600px){
    display: grid;
    place-items: center;
  }
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

  &:hover{
    filter: drop-shadow(0px 0px 5px white);
    cursor: pointer;
  }
`;

const ItemArea = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: #9b870c;

`;

const Indicator = styled.div`
  margin-bottom: 20px;
  width: 250px;
  text-align: center;

  @media (min-width: 600px){
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  }
`;

const Total = styled.h3`
  font-size: 28px;
  color: #0da715;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
`;

export default Game;
