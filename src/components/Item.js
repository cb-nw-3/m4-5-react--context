import React from "react";
import styled from "styled-components";

const Item = ({
  index,
  name,
  cost,
  value,
  numOwned,
  handleAttemptedPurchase,
}) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (index === 0) {
      ref.current.focus();
    }
  }, [index]);

  return (
    <Wrapper ref={ref} onClick={handleAttemptedPurchase}>
      <Left>
        <Name>{name}</Name>
        <Info>
          Cost: {cost} cookies. Produces {value} {value === 1 ? 'cookie' : 'cookies'}/second.
        </Info>
      </Left>
      <Right>{numOwned}</Right>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  text-align: left;
  padding: 15px 5px;
  outline: none;
  cursor: pointer;

  &:focus{
      box-shadow: 0px 0px 4px 4px darkblue;
      border-radius: 2px;
      border-bottom: 2px solid transparent;
      cursor: pointer;
  }

  &:hover{
    cursor: pointer;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Name = styled.h4`
  font-size: 22px;
`;

const Info = styled.div`
  font-size: 16px;
`;

const Right = styled.div`
  font-size: 32px;
  padding: 0 20px;
`;

export default Item;
