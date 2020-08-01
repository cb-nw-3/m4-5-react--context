import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import useKeydown from "../hooks/useKeydown.hook";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";
import cookieSrc from "../cookie.svg";
import { GameContext } from "./GameContext";

const Game = () => {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    cookiesPerClick,
    setCookiesPerClick,
    items,
    setItems,
    calculateCookiesPerTick,
  } = React.useContext(GameContext);

  const addOneCookie = () => {
    setNumCookies(numCookies + cookiesPerClick);
  };

  React.useEffect(() => {
    const calculateCookiesPerClick = () => {
      let numToAdd = purchasedItems["megacursor"] * 2;
      console.log("num to Add", numToAdd);
      return numToAdd;
    };
    const numbOfCookiesPerClick = calculateCookiesPerClick();
    setCookiesPerClick(1 + numbOfCookiesPerClick);
  }, [purchasedItems, setCookiesPerClick]);

  useDocumentTitle(`${numCookies} cookies`, `Click that COOKIE`);

  useKeydown("Space", addOneCookie);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second. <br></br>
          <strong>{`${cookiesPerClick}`}</strong> cookies per click
        </Indicator>
        <Button
          onClick={(ev) => {
            console.log("in button event");
            ev.stopPropagation();
            setNumCookies(numCookies + cookiesPerClick);
          }}
        >
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          let isFirst;
          if (index === 0) {
            isFirst = true;
          }
          return (
            <Item
              key={item.name + index}
              isFirst={isFirst}
              name={item.name}
              cost={item.cost}
              value={item.value}
              type={item.type}
              numOwned={purchasedItems[item.id]}
              handleClick={(ev) => {
                ev.stopPropagation();
                if (item.cost > numCookies) {
                  window.alert("Not enough cookies to buy!");
                } else {
                  setNumCookies(numCookies - item.cost);
                  const updatedObject = {
                    ...purchasedItems,
                    [item.id]: purchasedItems[`${item.id}`] + 1,
                  };
                  setPurchasedItems(updatedObject);
                  const newItemsArray = items.map((item, index2) => {
                    if (index2 === index) {
                      item.cost = Math.round(item.cost * 1.25);
                      return item;
                    } else {
                      return item;
                    }
                  });
                  setItems(newItemsArray);
                }
              }}
            ></Item>
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
