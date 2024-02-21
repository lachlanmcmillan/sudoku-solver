import styles from "./History.module.css";
import { useGameStateHistory } from '../../hooks/useGameStateHistory';

function History() {
  const historySnapshots = useGameStateHistory();

  return (
    <div >
      <h3>History</h3>
      <ul className={styles.history_list}>
        {historySnapshots.map((x, index) => 
          <li key={index}>{x.lastMove ? <HistoryLine {...x.lastMove} /> : "Initialised grid"}</li>
        )}
      </ul>
    </div>
  )
}

const HistoryLine = ({row, column, value}: { row: number, column: number, value: number }) =>
  <div>Set [x: {column}, y:{row}] to {value}</div>

export default History;
