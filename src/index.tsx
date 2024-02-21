import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import * as gameStateHistory from './store/gameStateHistory';
import * as game from './lib/game';
import * as sample from './lib/sample.ts';

function init() {
  gameStateHistory.initialise(sample.grids[0]); // empty grid
  gameStateHistory.loadHistoryFromLocalStorage();

  gameStateHistory.subscribe(() => {
    gameStateHistory.saveHistoryToLocalStorage();
  })

  // @ts-ignore
  window.printGrid = () => {
    const gameState = gameStateHistory.currentState();
    if (gameState) {
      console.log(game.gridToString(gameState));
    }
  }

  // @ts-ignore
  window.printGridPretty = () => {
    const gameState = gameStateHistory.currentState();
    if (gameState) {
      console.log(game.gridToStringPretty(gameState));
    }
  }

  ReactDOM.createRoot(document.getElementById('app-root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

init();


