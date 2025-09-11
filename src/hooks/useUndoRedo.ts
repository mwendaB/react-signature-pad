import { useState, useCallback } from 'react';
import { UseUndoRedoResult } from '../types';

export const useUndoRedo = (getCurrentState: () => string): UseUndoRedoResult => {
  const [history, setHistory] = useState<string[]>([]);
  const [future, setFuture] = useState<string[]>([]);
  const [maxHistorySize] = useState(50);

  const addState = useCallback((state: string) => {
    setHistory(prev => {
      const newHistory = [...prev, state];
      // Limit history size
      return newHistory.slice(-maxHistorySize);
    });
    setFuture([]); // Clear future when adding a new state
  }, [maxHistorySize]);

  const undo = useCallback((): string | undefined => {
    if (history.length === 0) return undefined;
    
    const previousState = history[history.length - 1];
    const currentState = getCurrentState();
    
    setHistory(prev => prev.slice(0, -1));
    setFuture(prev => [currentState, ...prev]);
    
    return previousState;
  }, [history, getCurrentState]);

  const redo = useCallback((): string | undefined => {
    if (future.length === 0) return undefined;
    
    const nextState = future[0];
    
    setHistory(prev => [...prev, getCurrentState()]);
    setFuture(prev => prev.slice(1));
    
    return nextState;
  }, [future, getCurrentState]);

  const clearHistory = useCallback((): void => {
    setHistory([]);
    setFuture([]);
  }, []);

  return {
    addState,
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    clearHistory
  };
};