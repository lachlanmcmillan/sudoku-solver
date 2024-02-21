import { describe, expect, test } from 'vitest';
import * as game from './game';

const _ = game.Empty;

describe("game", () => {
	test("initGameState", () => {
		const gameState = game.createEmptyGrid();
		
		expect(gameState.length === 81);

		for (let i = 0; i < gameState.length; i++) {
			expect(gameState[i]).toBe(game.Empty);
		}
	})

	describe("getIndex", () => {
		//  Grid indicies visualised
		//  
		//    │  1   2   3    4   5   6    7   8   9
		//  ──┼────────────┬────────────┬────────────┐
		//  1 │  0   1   2 │  3   4   5 │  6   7   8 │
		//  2 │  9  10  11 │ 12  13  14 │ 15  16  17 │
		//  3 │ 18  19  20 │ 21  22  23 │ 24  25  26 │
		//    ├────────────┼────────────┼────────────┤
		//  4 │ 27  28  29 │ 30  31  32 │ 33  34  35 │
		//  5 │ 36  37  38 │ 39  40  41 │ 42  43  44 │
		//  6 │ 45  46  47 │ 48  49  50 │ 51  52  53 │
		//    ├────────────┼────────────┼────────────┤
		//  7 │ 54  55  56 │ 57  58  59 │ 60  61  62 │
		//  8 │ 63  64  65 │ 66  67  68 │ 69  70  71 │
		//  9 │ 72  73  74 │ 75  76  77 │ 78  79  80 │
		//    └────────────┴────────────┴────────────┘

		test("gets the index correctly", () => {
			expect(game.getIndex(1,1)).toBe(0);
			expect(game.getIndex(1,9)).toBe(8);
			expect(game.getIndex(2,1)).toBe(9);
			expect(game.getIndex(4,6)).toBe(32);
			expect(game.getIndex(9,9)).toBe(80);
		});

		test("bounds checking", () => {
			expect(() => game.getIndex(0, 1)).toThrowError();
			expect(() => game.getIndex(1, 0)).toThrowError();

			expect(() => game.getIndex(10, 1)).toThrowError();
			expect(() => game.getIndex(1, 10)).toThrowError();
		})
	});

	describe("getLocation", () => {
		test("gets the location correctly", () => {
			expect(game.getLocation(0)).toStrictEqual({ row: 1, column: 1 });
			expect(game.getLocation(1)).toStrictEqual({ row: 1, column: 2 });
			expect(game.getLocation(2)).toStrictEqual({ row: 1, column: 3 });
			expect(game.getLocation(3)).toStrictEqual({ row: 1, column: 4 });
			expect(game.getLocation(4)).toStrictEqual({ row: 1, column: 5 });
			expect(game.getLocation(5)).toStrictEqual({ row: 1, column: 6 });
			expect(game.getLocation(6)).toStrictEqual({ row: 1, column: 7 });
			expect(game.getLocation(7)).toStrictEqual({ row: 1, column: 8 });
			expect(game.getLocation(8)).toStrictEqual({ row: 1, column: 9 });
			expect(game.getLocation(9)).toStrictEqual({ row: 2, column: 1 });
		});
	});

	describe("setCell", () => {
		test("only accepts valid values", () => {
			const gameState = game.createEmptyGrid();

			expect(() => game.setCell(1, 1, 0, gameState)).toThrowError();
			expect(() => game.setCell(1, 1, 10, gameState)).toThrowError();
			// @ts-ignore
			expect(() => game.setCell(1, 1, 'blah', gameState)).toThrowError();
		});

		test("sets the cell correctly", () => {
			const gameState = game.createEmptyGrid();

			const result = game.setCell(1, 1, 5, gameState);

			expect(result[0]).toEqual(5);
		});

		test("doesn't mutate parameters", () => {
			const gameState = game.createEmptyGrid();

			game.setCell(1, 1, 5, gameState);

			expect(gameState[0]).toEqual(game.Empty);
		});
	})

	describe("setRow", () => {
		test("only accepts full row of values", () => {
			const gameState = game.createEmptyGrid();

			expect(() => game.setRow(0, [1,2,3], gameState)).toThrowError();
			expect(() => game.setRow(0, [1,2,3,4,5,6,7,8,9,9], gameState)).toThrowError();
		});

		test("sets an entire row correctly", () => {
			const gameState = game.createEmptyGrid();

			const expected = [
				_,_,_,_,_,_,_,_,_,
				_,_,_,_,_,_,_,_,_,
				5,1,3,9,7,6,2,8,4,
				_,_,_,_,_,_,_,_,_,
				_,_,_,_,_,_,_,_,_,
				_,_,_,_,_,_,_,_,_,
				_,_,_,_,_,_,_,_,_,
				_,_,_,_,_,_,_,_,_,
				_,_,_,_,_,_,_,_,_,
			];

			const actual = game.setRow(3, [5,1,3,9,7,6,2,8,4], gameState);

			expect(actual).toEqual(expected);
		});
	});

	describe("getSquare", () => {
		test("gets all the array indicies for the square specified", () => {
			expect(game.debug._getSquareIndicies(6, 9)).toEqual([33, 34, 35, 42, 43, 44, 51, 52, 53]);
		});

		test("gets all the values for a square", () => {
			const gameState: game.TGameState = [
				4,_,_,7,_,_,3,8,2,
				_,8,_,_,_,_,_,7,_,
				_,3,_,_,8,_,9,_,_,
				_,_,4,_,_,8,5,2,_,
				_,_,_,2,7,_,_,_,_,
				_,7,2,9,4,_,_,6,_,
				9,2,6,5,1,_,_,3,_,
				1,_,8,3,6,_,_,4,_,
				3,_,_,8,2,9,6,_,1,
			];
			
			expect(game.sliceSquare(8, 3, gameState)).toEqual([9,2,6,1,_,8,3,_,_]);
		});
	})

});
