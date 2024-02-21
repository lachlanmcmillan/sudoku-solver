import { describe, expect, test } from 'vitest';
import * as sampleGames from './sample';
import * as game from './game';
import * as solver from './solver';

describe("solver", () => {
  test("calcPossibleNumbers", () => {
    expect(solver.calcPossibleValues(7, 6, sampleGames.grids[0])).toStrictEqual([4,7]);	
  })

  test("method 2, column", () => {
    //		│ 1  2  3   4  5  6   7  8  9
    //	──┼─────────┬─────────┬─────────┐
    //	1 │         │ 5       │         │
    //	2 │         │       9 │         │
    //	3 │         │         │         │
    //		├─────────┼─────────┼─────────┤
    //	4 │         │       8 │         │
    //	5 │         │       3 │         │
    //	6 │ 5       │         │         │
    //		├─────────┼─────────┼─────────┤
    //	7 │         │       2 │         │
    //	8 │         │       1 │         │
    //	9 │         │       X │         │
    //		└─────────┴─────────┴─────────┘  
    // 
    // given a grid like the above, the cell at [6,9] (marked with an X)
    // could possiblly be {4,5,6,7}, however, the {5} is unable to be placed in 
    // in positions [6,1], [6,3], or [6,6], so [6,9] must be {5}.
    const _: game.TCell = game.Empty
    const grid = [
      _,_,_,5,_,_,_,_,_,
      _,_,_,_,_,9,_,_,_,
      _,_,_,_,_,_,_,_,_,
      _,_,_,_,_,8,_,_,_,
      _,_,_,_,_,3,_,_,_,
      5,_,_,_,_,_,_,_,_,
      _,_,_,_,_,2,_,_,_,
      _,_,_,_,_,1,_,_,_,
      _,_,_,_,_,_,_,_,_,
    ];
    expect(solver.advance(grid)).toEqual({
      index: game.getIndex(9, 6),
      row: 9,
      column: 6,
      value: 5,
    })
  })

  test("method 2, row", () => {
    const _: game.TCell = game.Empty;
    const grid = [
      _,_,_,_,_,_,_,_,_,
      _,_,_,_,_,_,_,_,_,
      _,_,_,_,_,_,_,_,_,
      _,9,_,_,3,8,_,2,1,
      _,_,_,_,_,5,_,_,_,
      5,_,_,_,_,_,_,_,_,
      _,_,_,_,_,_,_,_,_,
      _,_,_,_,_,_,_,_,_,
      _,_,_,_,_,_,_,_,_,
      ]
    expect(solver.advance(grid)).toEqual({
      index: game.getIndex(4, 7),
      row: 4,
      column: 7,
      value: 5,
    })
  })
});