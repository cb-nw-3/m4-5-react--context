import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import useInterval from "../hooks/use-interval.hook";

import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { lightTheme, darkTheme } from './Theme';
import GlobalStyles from "./GlobalStyles";

import Home from "./Home";
import Game from "./Game";

import { GameContext } from "./GameContext";

function App(props) {

  const [theme, setTheme] = React.useState('dark');

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  const { numCookies, setNumCookies, cookiesPerSecond } = React.useContext(
    GameContext
  );

  useInterval(() => {
    setNumCookies(numCookies + cookiesPerSecond);
  }, 1000);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Router className="dark">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game">
            <Button onClick={toggleTheme}>Toggle theme</Button>
            <Game />
          </Route>
        </Router>
      </>
    </ThemeProvider >
  );
}


const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px 10px;
  border-radius: 5px;
`

export default App;