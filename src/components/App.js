// Libraries
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Hooks
import useInterval from '../hooks/use-interval.hook';
import usePersistedState from '../hooks/use-persisted-state.hook';
// Data
import items from '../data';
// Components
import Home from './Home';
import Game from './Game';
// Styles
import GlobalStyles from '../styles/GlobalStyles';

function App(props) {
    const [numCookies, setNumCookies] = usePersistedState(1000, 'cookies');

    const initialItems = {
        cursor: 0,
        grandma: 0,
        farm: 0,
    };

    const [purchasedItems, setPurchasedItems] = usePersistedState(
        initialItems,
        'items'
    );

    const calculateCookiesPerSecond = (purchasedItems) => {
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
            const numOwned = purchasedItems[itemId];
            const item = items.find((item) => item.id === itemId);
            const value = item.value;

            return acc + value * numOwned;
        }, 0);
    };

    useInterval(() => {
        const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

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
                    <Game
                        numCookies={numCookies}
                        setNumCookies={setNumCookies}
                        purchasedItems={purchasedItems}
                        setPurchasedItems={setPurchasedItems}
                        calculateCookiesPerSecond={calculateCookiesPerSecond}
                    />
                </Route>
            </Router>
        </>
    );
}

export default App;
