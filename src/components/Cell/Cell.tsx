import styles from './Cell.module.css';
import * as game from '../../lib/game'
import * as util from '../../lib/util';;

interface ICell {
  row: number;
  column: number;
  value: game.TCell;
  highlight?: "dark" | "light";
  editable?: boolean;
  onValueChange: (newValue: game.TCell) => unknown;
}

function Cell({ row, column, value, highlight, editable, onValueChange }: ICell) {
  const classes = util.classNames({
    [styles.cell_root]:           true, // always on
    [styles.cell_border_top]:     row === 1 || row === 4 || row === 7,
    [styles.cell_border_left]:    column === 1 || column === 4 || column === 7,
    [styles.cell_border_right]:   column === 9,
    [styles.cell_border_bottom]:  row === 9,
    [styles.cell_highlight]:      highlight === "light",
    [styles.cell_highlight_dark]: highlight === "dark",
  });
  
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const value = evt.target.value.trim();
    if (value === '') {
      onValueChange(game.Empty);
      return;
    } 

    const number = Number.parseInt(value);
    if (!isNaN(number) && number > 0 && number <= 9) {
      onValueChange(number)
    }
  }

  return (
    <div className={classes}>
      {editable ?
        <input 
          type="text" 
          className={styles.cell_input} 
          value={value === game.Empty ? "" : value} 
          onChange={handleInputChange}
        />
      :
        <>{value === game.Empty ? " " : value.toString()}</>
      }
    </div>
  )
}

export default Cell;
