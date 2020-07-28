import React from "react";

import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, handleClick, isFirst, type }) => {
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    if (isFirst) {
      buttonRef.current.focus();
    }
  }, [isFirst]);

  return (
    <Wrapper onClick={handleClick} ref={buttonRef}>
      <div>
        <Name>{name}</Name>
        <Effect>
          Cost: {cost} cookies.
          {type === "tick"
            ? ` Produces ${value} cookies/second`
            : ` Adds ${value} cookies per click`}
        </Effect>
      </div>
      <Num>{numOwned}</Num>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 320px;
  text-align: left;
  border-bottom: 1px solid lightgrey;
  padding: 10px 0;
`;

const Name = styled.h2`
  font-size: 1.3em;
  font-weight: 700;
  color: white;
`;

const Effect = styled.p`
  color: lightgrey;
`;

const Num = styled.p`
  font-size: 2em;
  color: white;
  font-weight: 600;
`;

export default Item;
