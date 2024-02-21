import { describe, expect, test } from 'vitest';
import * as gameStateHistory from './gameStateHistory';

// @WARN. sequential tests
describe.sequential("gameStateHistory", () => {
	let subscriber1Count = 0;
	let subscriber2Count = 0;

	const callBack1 = () => { subscriber1Count++ }
	const callBack2 = () => { subscriber2Count++ }

	test("subscribers receive dispatches", () => {
		gameStateHistory.subscribe(callBack1)
		gameStateHistory.subscribe(callBack2)

		// the subscribe function should not call the callback until there is an 
		// event
		expect(subscriber1Count).toEqual(0);
		expect(subscriber2Count).toEqual(0);

		// trigger a dispatch
		gameStateHistory.initialise();

		expect(subscriber1Count).toBe(1);
		expect(subscriber2Count).toBe(1);

		// trigger a dispatch
		gameStateHistory.advance({column: 1, row: 1, value: 1 })

		expect(subscriber1Count).toBe(2);
		expect(subscriber2Count).toBe(2);
	})

	test("unsubscribing prevents callback from being called", () => {
		// unsubscribe one of the subscribers
		gameStateHistory.unsubscribe(callBack1);

		// trigger a dispatch
		gameStateHistory.advance({column: 1, row: 2, value: 2 })

		expect(subscriber1Count).toBe(2); // not called
		expect(subscriber2Count).toBe(3);
	});
});