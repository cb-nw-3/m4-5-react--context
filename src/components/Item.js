import React from "react";
import styled from "styled-components";

const Item = ({ item, numOwned, handleClick, focusOnLoad }) => {
  const buttonRef = React.useRef();

  React.useEffect(() => {
    if (focusOnLoad) {
      buttonRef.current.focus();
    }
  }, []);

  let description = "descriptionMissing";

  switch (item.type) {
    case "cps":
      description =
        item.value === 1
          ? `Produces: ${item.value} cookie/second.`
          : `Produces: ${item.value} cookies/second.`;
      break;
    case "cursor":
      description = `Adds 1 cookie per click.`;
      break;
  }

  return (
    <Wrapper onClick={handleClick} ref={buttonRef}>
      <div>
        <Title>{item.name}</Title>
        <Description>
          <span>Cost: {item.cost} cookie(s). </span>
          <span>{description} </span>
        </Description>
      </div>
      <Amount>{numOwned}</Amount>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: flex;
  width: 450px;
  justify-content: space-between;
  align-items: center;
  border: none;
  border-bottom: 1px white solid;
  background-color: transparent;
  padding: 20px 0;
`;

const Title = styled.h2`
  margin-bottom: 4px;
  text-align: left;
  color: white;
`;

const Description = styled.div`
  color: grey;
`;

const Amount = styled.h2`
  font-size: 2em;
  color: white;
`;

export default Item;
