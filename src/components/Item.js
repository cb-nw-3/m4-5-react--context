import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import addCommas from '../functions/addCommas';

const Item = ({ info, numOwned, handleClick, index }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (index === 0) {
      ref.current.focus();
    }
  }, [index]);

  return (
    <ItemWrapper ref={ref} onClick={handleClick}>
      <div>
        <div>{info.name}</div>
        <div>
          Cost: {addCommas(info.cost)} cookie(s). Produces {info.value}{' '}
          cookie(s)/
          {info.frequency}
        </div>
      </div>
      <Score>{numOwned}</Score>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  border: none;
  border-bottom: 1px solid gray;
  margin-bottom: 15px;
  padding: 10px 0;
  background-color: transparent;
  color: white;
  div {
    text-align: left;
  }
  div > div:first-child {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const Score = styled.div`
  font-size: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

export default Item;
