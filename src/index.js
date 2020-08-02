import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { GameProvider } from './components/GameContext';

const rootElement = document.getElementById("root");

ReactDOM.render(
    - <App />
    + <GameProvider>
    +   <App />
    + </GameProvider>,
      rootElement
    );
