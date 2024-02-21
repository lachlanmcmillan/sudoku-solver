import { describe, expect, test } from 'vitest';
import * as util from './util';

describe("util.ts", () => {
	test("assert", () => {
		expect(() => util.assert(false)).toThrowError();
		expect(() => util.assert(true)).not.toThrowError()
	});

	test("recursiveSlice", () => {
		const originalArray = [1,2,3,4,5,6,7,8,9];
		const expected = [[1,2,3],[4,5,6],[7,8,9]];
		expect(util.recursiveSlice(originalArray, 3)).toEqual(expected);

		const expected2 = [[1,2,3,4,5], [6,7,8,9]];
		expect(util.recursiveSlice(originalArray, 5)).toEqual(expected2);

		const expected3 = [[1,2,3,4,5,6,7,8,9]];
		expect(util.recursiveSlice(originalArray, 9)).toEqual(expected3);
	})

	test("setDifference", () => {
		const a = [1, 2, 3];
		const b = [2, 3, 4];
		expect(util.calcSetDifference(a, b)).toEqual([1]);
	});

	test("setIntersection", () => {
		const a = [1, 2, 3];
		const b = [2, 3, 4];
		expect(util.calcSetIntersection(a, b)).toEqual([2,3]);

		const d = [6, 7];
		const c = [4, 5, 6, 7];
		expect(util.calcSetIntersection(c, d)).toEqual([6,7]);
		expect(util.calcSetIntersection(d, c)).toEqual([6,7]);
	});

	test("sortObjectByProperty", () => {
		let initial = [{ id: 1, value: 30 }, { id: 2, value: 11 }, { id: 3, value: 9 }]
		let sorted = initial.sort(util.sortObjectByProperty('value'));
		let expected = [{ id: 3, value: 9 }, { id: 2, value: 11 }, { id: 1, value: 30 }]
		expect(sorted).toEqual(expected);
	});

	test("classNames", () => {
		const actual = util.classNames( 
			'A',
			['B', true],
			['C', false],
			{ D: true, E: false }
		); 
		expect(actual).toEqual("A B D");
	})
});