import React from "react";

import cookieSrc from "../cookie.svg";
import Item from "./Item.js";
import useKeydown from "../hooks/use-keydown.hook";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";
import { CookieContext } from "../CookieContext";

import {
  ItemButton,
  Wrapper,
  GameArea,
  Button,
  Cookie,
  ItemArea,
  SectionTitle,
  Indicator,
  Total,
  HomeLink,
} from "./styles/GameStyles.js";

const Game = ({ items }) => {
  const cookieContext = React.useContext(CookieContext);

  function IncreaseCookie() {
    cookieContext.setCookiesEarned(cookieContext.cookiesTotal + 1);
  }

  // why does this work?  I'm not setting title except for here... seems like it's weird a hook
  useDocumentTitle({
    title: `${cookieContext.cookiesTotal} cookies - Cookie Clicker Workshop`,
    fallbackTitle: `Cookie Clicker`,
  });

  useKeydown("Space", IncreaseCookie);

  React.useEffect(() => {
    cookieContext.setItems(items);
  }, [items]);

  // useInterval(() => {
  //   cookieContext.calculateCookiesPerTick(cookieContext.purchasedItems);
  // }, 1000);

  function HandleCookieClick(event) {
    let extra_cookies = cookieContext.purchasedItems.megaCursor * 2;
    cookieContext.setCookiesTotal(
      cookieContext.cookiesTotal + 1 + extra_cookies
    );
    console.log("click");
    console.log(cookieContext.cookiesTotal);
  }

  function HandleItemClick(event) {
    // console.log(event.target.parentNode.className);
    let item_from_items_list = cookieContext.items.find(
      (e) => e.id === event.target.parentNode.className
    );
    // console.log(item_from_items_list);

    let local_purchased = cookieContext.purchasedItems;

    if (item_from_items_list.cost <= cookieContext.cookiesTotal) {
      let item_index = cookieContext.items.findIndex(
        (i) => i.id === item_from_items_list.id
      );

      if (item_from_items_list.id === "cursor") {
        local_purchased.cursor = local_purchased.cursor + 1;
      } else if (item_from_items_list.id === "grandma") {
        local_purchased.grandma = local_purchased.grandma + 1;
      } else if (item_from_items_list.id === "farm") {
        local_purchased.farm = local_purchased.farm + 1;
      } else if (item_from_items_list.id === "megaCursor") {
        local_purchased.megaCursor = local_purchased.megaCursor + 1;

        cookieContext.setCookiesPerClick(
          cookieContext.cookiesPerClick + item_from_items_list.value
        );
      }

      cookieContext.setCookiesTotal(
        cookieContext.cookiesTotal - item_from_items_list.cost
      );

      cookieContext.setPurchasedItems({
        cursor: local_purchased.cursor,
        grandma: local_purchased.grandma,
        farm: local_purchased.farm,
        megaCursor: local_purchased.megaCursor,
      });
    }
  }

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{cookieContext.cookiesTotal} cookies</Total>
          <strong>{cookieContext.cookiesPerSecond}</strong> cookies per second
          <p>
            <strong>{cookieContext.cookiesPerClick}</strong> cookies per click
          </p>
        </Indicator>
        <Button onClick={HandleCookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>

        {items.map((item, i) => {
          let isFirst = false;
          if (i === 0) {
            isFirst = true;
          }
          return (
            <div className={item.id}>
              <ItemButton onClick={HandleItemClick}></ItemButton>
              <Item
                item={item}
                purchasedItems={cookieContext.purchasedItems}
                isFirst={isFirst}
              ></Item>
            </div>
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

export default Game;
