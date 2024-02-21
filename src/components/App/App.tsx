import * as solver from '../../lib/solver';
import * as game from '../../lib/game';
import * as history from '../../store/gameStateHistory';
import { useGameStateHistory } from '../../hooks/useGameStateHistory';
import Grid from '../Grid/Grid';
import History from '../History/History';
import styles from './App.module.css'

function App() {
  const historySnapshots = useGameStateHistory();

  const currentState = historySnapshots[historySnapshots.length - 1];

  const handleNextClick = () => {
    const nextMove = solver.advance(currentState.gameState);
    if (nextMove) {
      history.advance(nextMove);
    } 
  }

  const handleBackClick = () => {
    history.rewind();
  }

  const handleResetClick = () => {
    history.reset();
  }

  const handleCellChange = (row: number, column: number, newValue: game.TCell) => {
    history.initialise(game.setCell(row, column, newValue, currentState.gameState));
  }

  return (
    <>
      <Grid 
        gameState={currentState.gameState} 
        highlight={currentState.lastMove} 
        editable={true} 
        onCellChange={handleCellChange} 
      />
      <h1>Sudoku Solver</h1>
        <p className={styles.paragraph}>
          Click on a square of the Sudoku Grid to input a digit, then press Next to solve the next cell.
        </p>
      <div className={styles.card}>
        <button onClick={handleBackClick}>
          Back
        </button>
        <button onClick={handleResetClick}>
          Reset
        </button>
        <button onClick={handleNextClick}>
          Next
        </button>
      </div>
      <History />
    </>
  )
}

export default App
