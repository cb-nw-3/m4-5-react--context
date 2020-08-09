import React from "react";
import styled from "styled-components";

const Item = ({ name, handleClick }) => {
  return (
    <Button>
      <button onClick={handleClick}>{name}</button>
    </Button>
  );
};

const Button = styled.button`
  border-radius: 10px;
  padding: 10px;
`;

export default Item;
