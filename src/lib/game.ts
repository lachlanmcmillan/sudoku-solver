import * as util from './util';

export type TCell = number | "empty";
export type TGameState = TCell[];
export const Empty: TCell  = "empty";

export function createEmptyGrid(): TGameState {
	const grid = new Array<TCell>(81);
	return grid.fill(Empty);
}

export function getCell<T>(row: number, column: number, gameState: T[]): T {
	const index = getIndex(row, column);
  return gameState[index];
}

export function setCell(row: number, column: number, value: TCell, gameState: TGameState): TGameState {
	_assertValidCellValue(value);

	const index = getIndex(row, column);

	// is there a simpler way to modify one array element without mutating the original?
	return gameState.map((originalValue, i) => i === index ? value : originalValue)
}

export function setRow(row: number, values: number[], gameState: TGameState): TGameState {
	util.assert(values.length === 9);

	// could be optimised to mutate instead of copy
	return values.reduce((prevState, value, rowIndex) =>
		setCell(row, rowIndex + 1, value, prevState)
	, gameState);
}

export function sliceRow<T>(row: number, gameState: T[]): T[] {
	util.assert(util.RANGE_1_9.includes(row));
	const start = (row - 1) * 9;
	return gameState.slice(start, start + 9);
}

export function sliceColumn<T>(column: number, gameState: T[]): T[] {
	util.assert(util.RANGE_1_9.includes(column));
	return [
		getCell(1, column, gameState),
		getCell(2, column, gameState),
		getCell(3, column, gameState),
		getCell(4, column, gameState),
		getCell(5, column, gameState),
		getCell(6, column, gameState),
		getCell(7, column, gameState),
		getCell(8, column, gameState),
		getCell(9, column, gameState),
	];
}

export function sliceSquare(row: number, column: number, gameState: TGameState): TCell[] {
	util.assert(util.RANGE_1_9.includes(row));
	util.assert(util.RANGE_1_9.includes(column));
	return _getSquareIndicies(row, column).map(index => gameState[index]);
}

function _getSquareIndicies(row: number, column: number): number[] {
	_assertValidLocation(row, column);

	let columns = (
		column < 4
		? [1,2,3]
		: column < 7
		? [4,5,6]
		: [7,8,9]
	);

	let rows = (
		row < 4
		? [1,2,3]
		: row < 7
		? [4,5,6]
		: [7,8,9]
	);

	return rows.flatMap(indexRow =>
		columns.map(indexColumn =>
			getIndex(indexRow, indexColumn)
		)
	)
}

export function getIndex(row: number, column: number): number {
	_assertValidLocation(row, column);
	return ((row - 1) * 9) + (column - 1);
}

export function getLocation(index: number) {
	_assertValidIndex(index);
	const row = (Math.floor(index / 9)) + 1;
	const column = (index % 9) + 1; 
	return { row, column };
}

function _assertValidLocation(row: number, column: number): void {
  util.assert(row >= 1, row <= 9);
  util.assert(column >= 1, column <= 9);
}

function _assertValidIndex(index: number): void {
	util.assert(index >= 0, index < 81);
}

function _assertValidCellValue(value: string | number): void {
		if (typeof value === 'number') {
			util.assert(value >= 1 && value <= 9)
			return;
		}
	
		if (typeof value === 'string') {
			util.assert(value === Empty);
			return;
		}
	
		throw new Error("Assertion Failed!");
}

export const debug = {
	_getSquareIndicies
}

export function gridToString(gameState: TGameState): string {
  const str = util.recursiveSlice(gameState, 9) // convert to 2D array
		.map(line => line.map(x => typeof x === 'string' ? "_" : x).join(','))
		.map(line => "  " + line) // indent each row
		.join('\n')
  return `[\n${str}\n]`;
}

export function gridToStringPretty(gameState: TGameState): string {
	// print row
	const pr = (values: TCell[]) => {
    let [a,b,c,d,e,f,g,h,i] = values.map(x => x === Empty ? " " : x);
    return  ` ${a}  ${b}  ${c} │ ${d}  ${e}  ${f} │ ${g}  ${h}  ${i} `
  }

  const grid = "\n" +
    `  │ 1  2  3   4  5  6   7  8  9   \n` +
    `──┼─────────┬─────────┬─────────┐ \n` +
    `1 |${pr(sliceRow(1, gameState))}| \n` +
    `2 |${pr(sliceRow(2, gameState))}| \n` +
    `3 |${pr(sliceRow(3, gameState))}| \n` +
    `  ├─────────┼─────────┼─────────┤ \n` +
    `4 |${pr(sliceRow(4, gameState))}| \n` +
    `5 |${pr(sliceRow(5, gameState))}| \n` +
    `6 |${pr(sliceRow(6, gameState))}| \n` +
    `  ├─────────┼─────────┼─────────┤ \n` +
    `7 |${pr(sliceRow(7, gameState))}| \n` +
    `8 |${pr(sliceRow(8, gameState))}| \n` +
    `9 |${pr(sliceRow(9, gameState))}| \n` +
    `  └─────────┴─────────┴─────────┘`
    return grid
}