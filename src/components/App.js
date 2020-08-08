// Libraries
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Hooks
import useInterval from '../hooks/use-interval.hook';
// Components
import { GameContext } from './GameContext';
import Home from './Home';
import Game from './Game';
// Styles
import GlobalStyles from '../styles/GlobalStyles';

function App(props) {
    const {
        numCookies,
        setNumCookies,
        numOfGeneratedCookies
    } = React.useContext(GameContext);

    useInterval(() => {
        setNumCookies(numCookies + numOfGeneratedCookies);
    }, 1000);

    return (
        <>
            <GlobalStyles />
            <Router>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/game">
                    <Game />
                </Route>
            </Router>
        </>
    );
}

export default App;
