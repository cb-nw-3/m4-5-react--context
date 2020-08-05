import React from "react";
import styled from "styled-components";

const Test = () => {
  const firstNameRef = React.useRef(null);
  React.useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  return <div ref={firstNameRef}>test</div>;
};

export default Test;
