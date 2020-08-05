import React from "react";
import styled from "styled-components";

function HandleClick() {}

const Item = ({ item, purchasedItems, isFirst }) => {
  const firstNameRef = React.useRef(null);

  let purchased_item = Object.entries(purchasedItems).find(
    (e) => e[0] === item.id
  );

  let purchased_item_count = purchased_item[1];
  let value_statement;
  if (item.id === "megaCursor") {
    value_statement = `cookies.  Produces ${item.value} cookies/click.`;
  } else {
    value_statement = `cookies.  Produces ${item.value} cookies/second.`;
  }

  React.useEffect(() => {
    if (isFirst) {
      firstNameRef.current.focus();
    }
  });

  return (
    <ItemElement>
      <Button ref={firstNameRef} onClick={HandleClick}></Button>

      <ItemNameAndCost>
        <ItemTitle>{item.name}</ItemTitle>
        <ItemCostAndValue>
          Cost: {item.cost} {value_statement}
        </ItemCostAndValue>
      </ItemNameAndCost>
      <ItemValue>{purchased_item_count}</ItemValue>
    </ItemElement>
  );
};

const ItemElement = styled.div`
  border-bottom: 3px solid grey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  z-index: 1;
`;

const ItemNameAndCost = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 4;
`;
const ItemValue = styled.div`
  font-size: 30px;
  flex-grow: 1;
  text-align: right;
`;

const ItemCostAndValue = styled.div`
  font-size: 15px;
  color: grey;
`;

const ItemTitle = styled.span`
  font-size: 20px;
`;

const Button = styled.button`
  background: transparent;
  position: absolute;
  width: 380px;
  height: 50px;
  border: 0px;
`;

export default Item;
