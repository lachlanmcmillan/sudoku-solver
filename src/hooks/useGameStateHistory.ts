import * as React from 'react';
import * as history from '../store/gameStateHistory';

// using this hook in a component will cause react to re-render the component
// whenever the gameStateHistory store is updated.
export const useGameStateHistory = (): history.THistoryArray =>
  React.useSyncExternalStore(history.subscribe, history.getSnapshot);