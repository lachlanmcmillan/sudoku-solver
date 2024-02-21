import styles from './Grid.module.css'
import Cell from '../Cell/Cell';
import { TGameState, TCell, getCell } from '../../lib/game';
import { RANGE_1_9 } from '../../lib/util';

interface IGrid {
  editable?: boolean;
  gameState: TGameState;
  highlight?: { row: number, column: number }
  onCellChange?: any;
}

const Grid = ({ 
  editable,
  gameState, 
  highlight, 
  onCellChange, 
}: IGrid) =>
  <div className={styles.grid_root}>
    {RANGE_1_9.map((row: number) =>
      <div className={styles.grid_row} key={row} >
        {RANGE_1_9.map((column) =>
          <Cell 
            row={row} 
            column={column} 
            value={getCell(row, column, gameState)} 
            key={`row=${row} column=${column}`} 
            highlight={
              row === highlight?.row && column === highlight?.column
              ? "dark"
              : row === highlight?.row || column === highlight?.column
              ? "light"
              : undefined
            }
            onValueChange={(newValue: TCell)  => onCellChange(row, column, newValue) }
            editable={editable}
          />
        )}
      </div>
    )}
  </div>

export default Grid;
