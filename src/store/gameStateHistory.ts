import * as game from '../lib/game';

export interface IGameMove {
	row: number;
	column: number;
	value: number;
}

export interface IHistoryEntry {
	gameState: game.TGameState;
	lastMove?: IGameMove;
}

export type THistoryArray = IHistoryEntry[]

const _LOCAL_STORAGE_KEY = "history"
let _subscribers: Array<any> = [];
let _timeline: THistoryArray = [];

export type TCallbackFn = (timeline: THistoryArray) => unknown;

export function subscribe(callbackFn: TCallbackFn) {
	_subscribers.push(callbackFn);
	return () => unsubscribe(callbackFn);
}

export function unsubscribe (callbackFn: TCallbackFn) {
	_subscribers = _subscribers.filter(x => x !== callbackFn);
}

export function initialise(gameState: game.TGameState = game.createEmptyGrid()): void {
	_timeline = [{ gameState }];
	dispatch();
}

export function advance(nextMove: IGameMove) {
	const newGameState = game.setCell(nextMove.row, nextMove.column, nextMove.value, _timeline[_timeline.length - 1].gameState);
	_timeline = [..._timeline, { gameState: newGameState, lastMove: nextMove}];
	dispatch();
}

export function rewind() {
	// can't go further back than the initial state
	if (_timeline.length > 1) {
		_timeline = _timeline.slice(0, _timeline.length - 1)
	}
	dispatch();
}

export function reset() {
	_timeline = _timeline.slice(0, 1);
	dispatch();
}

export function getSnapshot(): THistoryArray { 
	return _timeline;
}

export function loadHistory(data: THistoryArray) {
	_timeline = data;
}

// notifies all subscribers that state has changed
function dispatch() {
	_subscribers.forEach(callbackFn => callbackFn(getSnapshot()));
};

export function currentState(): game.TGameState | null {
	if (_timeline.length === 0) {
		return null;
	} else {
		return _timeline[_timeline.length - 1].gameState;
	}
}

export function saveHistoryToLocalStorage(): void {
  localStorage.setItem(_LOCAL_STORAGE_KEY, JSON.stringify(_timeline)); 
}

export function loadHistoryFromLocalStorage(): void {
  const savedHistory = localStorage.getItem(_LOCAL_STORAGE_KEY);
  if (savedHistory) {
    let data;
    try {
      data = JSON.parse(savedHistory);
    } catch (e) {
      console.error("failed to parse history in localStorage");
    }
    if (data) {
      // @warning no type checking on the localStorage data
      loadHistory(data)
    }
  }
}