import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Item from './Item';
import cookieSrc from '../cookie.svg';
import useInterval from '../hooks/use-interval.hook';
import useKeydown from '../hooks/use-keydown.hook';
import addCommas from '../functions/addCommas';
import useDocumentTitle from '../hooks/use-documentTitle.hook';
import { GameContext } from '../components/GameContext';
import stars from '../stars.gif';

let styleBackground = {
  backgroundImage: 'url(' + stars + ')',
  width: '500px',
  height: '700px',
};

let styleButton = {
  outline: 'none',
};

const Game = () => {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    itemCost,
    setItemCost,
  } = useContext(GameContext);
  const items = [
    {
      id: 'cursor',
      name: 'Cursor',
      cost: itemCost.cursor,
      value: 1,
      frequency: 'second',
    },
    {
      id: 'grandma',
      name: 'Grandma',
      cost: itemCost.grandma,
      value: 10,
      frequency: 'second',
    },
    {
      id: 'farm',
      name: 'Farm',
      cost: itemCost.farm,
      value: 80,
      frequency: 'second',
    },
    {
      id: 'megaCursor',
      name: 'Mega Cursor',
      cost: itemCost.megaCursor,
      value: 700,
      frequency: 'click',
    },
  ];

  useInterval(() => {
    setNumCookies((n) => n + calculateCookiesPerTick().perSecond);
  }, 1000);

  const calculateCookiesPerTick = () => {
    const additionalCookies = {
      perSecond: 0,
      perClick: 1,
    };
    // checking items with frequency per second
    const itemsPerSecond = items.filter(
      (element) => element.frequency === 'second'
    );
    const reducerSec = (accumulator, current) =>
      accumulator + current.value * purchasedItems[current.id];
    additionalCookies.perSecond = itemsPerSecond.reduce(reducerSec, 0);
    // checking item with frecuency per click
    const itemsPerClick = items.filter(
      (element) => element.frequency === 'click'
    );
    const reducerClick = (accumulator, current) =>
      accumulator + current.value * purchasedItems[current.id];
    additionalCookies.perClick = 1 + itemsPerClick.reduce(reducerClick, 0);
    console.log(additionalCookies);

    return additionalCookies;
  };

  useDocumentTitle(numCookies, 'Cookie Clicker Workshop');
  useKeydown('Space', () =>
    setNumCookies((n) => n + 1 + calculateCookiesPerTick().perClick)
  );

  // useEffect(() => {
  //   if (window.localStorage.getItem('cookieClickerInfo') !== null) {
  //     const loadedInfo = JSON.parse(
  //       window.localStorage.getItem('cookieClickerInfo')
  //     );
  //     setPurchasedItems(loadedInfo.purchasedItems);
  //     const timeWhenLoading = new Date();
  //     const lapse = Math.floor(
  //       Math.abs(timeWhenLoading - new Date(loadedInfo.time)) / 1000
  //     );
  //     console.log(
  //       numCookies,
  //       calculateCookiesPerSecond(purchasedItems),
  //       purchasedItems,
  //       lapse
  //     );
  //     setNumCookies(
  //       loadedInfo.numCookies +
  //         calculateCookiesPerSecond(loadedInfo.purchasedItems) * lapse
  //     );
  //   }
  // }, []);

  useEffect(() => {
    window.localStorage.setItem(
      'cookieClickerInfo',
      JSON.stringify({ purchasedItems, numCookies, time: new Date() })
    );
  }, [numCookies, purchasedItems]);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{addCommas(numCookies)} cookies</Total>
          <strong>{addCommas(calculateCookiesPerTick().perSecond)}</strong>{' '}
          cookies per second
          <br></br>
          <strong>{addCommas(calculateCookiesPerTick().perClick)}</strong>{' '}
          cookies per click
        </Indicator>
        <Background style={styleBackground}>
          <Button
            style={styleButton}
            onClick={() => {
              setNumCookies((n) => n + 1 + calculateCookiesPerTick().perClick);
            }}
          >
            <Cookie src={cookieSrc} />
          </Button>
        </Background>
      </GameArea>
      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((element, index) => (
          <Item
            key={'btn' + index}
            info={element}
            numOwned={purchasedItems[element.id]}
            handleClick={() => {
              if (numCookies < element.cost) {
                alert('Not enough cookies');
                return;
              } else {
                setNumCookies(numCookies - element.cost);
                setPurchasedItems({
                  ...purchasedItems,
                  [element.id]: purchasedItems[element.id] + 1,
                });
                setItemCost({
                  ...itemCost,
                  [element.id]: Math.floor(1 + itemCost[element.id] ** 1.07),
                });
              }
            }}
            index={index}
          ></Item>
        ))}
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

const Background = styled.div`
  position: relative;
  width: 400px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 12px solid transparent;
  border-image: linear-gradient(
    to bottom right,
    #b827fc 0%,
    #2c90fc 25%,
    #b8fd33 50%,
    #fec837 75%,
    #fd1892 100%
  );
  border-image-slice: 1;
  overflow: hidden;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  outline: none;
`;

const Cookie = styled.img`
  width: 200px;
  border-radius: 50%;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 5vw;
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
