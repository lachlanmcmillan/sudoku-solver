// import { getCell, getRow, getColumn, getSquare, TGameState, getLocation } from "./game";
import * as game from "./game";
import * as util from "./util";

export function calcPossibleValues(row: number, column: number, gameState: game.TGameState): number[] {
	util.assert(game.getCell(row, column, gameState) === game.Empty);

	const usedNumbers = [
		game.sliceRow(row, gameState),
		game.sliceColumn(column, gameState),
		game.sliceSquare(row, column, gameState)
	].flat();

	const setUsedNumbers = Array.from(new Set(usedNumbers));

	return util.calcSetDifference(util.RANGE_1_9, setUsedNumbers);
}

export type TNextCell = {
	index: number,
	row: number,
	column: number,
	value: number
}

export function advance(gameState: game.TGameState): TNextCell | undefined {
	const cellsWithEntropy = gameState.map((value, index) => {
		const { row, column } = game.getLocation(index);
		const possibleValues = value === game.Empty ? calcPossibleValues(row, column, gameState) : [];
		const entropy = possibleValues.length; 
		return {
			index,
			row,
			column,
			possibleValues,
			entropy
		}
	})

	const cellsSortedByEntropy = cellsWithEntropy
		.filter(x => x.entropy)
		.sort(util.sortObjectByProperty('entropy'))
	
	for (let cell of cellsSortedByEntropy) {
		if (cell.entropy === 1) {
			return {
				...cell,
				value: cell.possibleValues[0]	
			};
		}
	}

	// for each column of columns
	for (const colIndex of util.RANGE_1_9) {
		const filledValues = game.sliceColumn(colIndex, gameState);

		// get possible values for the column
		const possibleValues = util.calcSetDifference(util.RANGE_1_9, filledValues);

		// for each number of possible values
		for (const num of possibleValues) {

			// get the possible cells in the column as an array
			const possibleCells = game
				.sliceColumn(colIndex, cellsWithEntropy)
				.filter(cell => cell.possibleValues.includes(num))
			
			// if there's only one possible cell then fill the square
			if (possibleCells.length === 1) {
				return {
					index: possibleCells[0].index,
					row: possibleCells[0].row,
					column: possibleCells[0].column,
					value: num	
				};
			}
		}
	}

	for (const rowIndex of util.RANGE_1_9) {
		const filledValues = game.sliceRow(rowIndex, gameState);

		// get possible values for the row
		const possibleValues = util.calcSetDifference(util.RANGE_1_9, filledValues);

		// for each number of possible values
		for (const num of possibleValues) {

			// get the possible cells in the row as an array
			const possibleCells = game
				.sliceRow(rowIndex, cellsWithEntropy)
				.filter(cell => cell.possibleValues.includes(num))
			
			// if there's only one possible cell then fill the square
			if (possibleCells.length === 1) {
				return {
					index: possibleCells[0].index,
					row: possibleCells[0].row,
					column: possibleCells[0].column,
					value: num	
				};
			}
		}
	}
}