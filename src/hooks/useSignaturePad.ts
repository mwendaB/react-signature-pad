import { useCallback, useEffect, useState } from 'react';
import { useSignature } from './useSignature';
import { useUndoRedo } from './useUndoRedo';
import { SignatureOptions } from '../types';

export interface UseSignaturePadOptions extends Partial<SignatureOptions> {
  maxHistorySize?: number;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

export interface UseSignaturePadResult {
  // Canvas operations
  canvas: {
    ref: React.RefObject<HTMLCanvasElement>;
    isEmpty: boolean;
    isDrawing: boolean;
    draw: {
      start: (event: MouseEvent | TouchEvent) => void;
      move: (event: MouseEvent | TouchEvent) => void;
      end: () => void;
    };
    clear: () => void;
    resize: () => void;
  };
  
  // History management
  history: {
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    clearHistory: () => void;
    addCheckpoint: () => void;
  };
  
  // Export capabilities
  export: {
    toDataURL: (type?: string, quality?: number) => string;
    toBlob: () => Promise<Blob | null>;
    exportAsImage: (filename?: string) => void;
    exportAsSVG: () => string;
  };
  
  // Settings management
  settings: {
    current: SignatureOptions;
    update: (options: Partial<SignatureOptions>) => void;
    reset: () => void;
    penColor: string;
    penWidth: number;
    backgroundColor: string;
    drawingMode: SignatureOptions['drawingMode'];
    setPenColor: (color: string) => void;
    setPenWidth: (width: number) => void;
    setBackgroundColor: (color: string) => void;
    setDrawingMode: (mode: SignatureOptions['drawingMode']) => void;
  };
  
  // State management
  state: {
    loading: boolean;
    error: string | null;
    hasChanges: boolean;
  };
  
  // Event handlers
  events: {
    onSave?: (dataUrl: string) => Promise<void> | void;
    onChange?: (isEmpty: boolean) => void;
    onError?: (error: Error) => void;
  };
}

export function useSignaturePad(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: UseSignaturePadOptions = {},
  callbacks: {
    onSave?: (dataUrl: string) => Promise<void> | void;
    onChange?: (isEmpty: boolean) => void;
    onError?: (error: Error) => void;
  } = {}
): UseSignaturePadResult {
  const [isDrawing, setIsDrawing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialOptions] = useState(options);

  // Initialize signature hook
  const signature = useSignature(canvasRef, options);
  
  // Initialize history hook
  const history = useUndoRedo(
    () => signature.toDataURL('image/png')
  );

  // Handle errors
  const handleError = useCallback((err: Error) => {
    setError(err.message);
    callbacks.onError?.(err);
  }, [callbacks]);

  // Clear error
  const clearError = useCallback(() => setError(null), []);

  // Enhanced draw handlers with error handling
  const enhancedDraw = {
    start: useCallback((event: MouseEvent | TouchEvent) => {
      try {
        clearError();
        setIsDrawing(true);
        signature.draw.start(event);
      } catch (err) {
        handleError(err as Error);
      }
    }, [signature.draw, clearError, handleError]),

    move: useCallback((event: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      try {
        signature.draw.move(event);
      } catch (err) {
        handleError(err as Error);
      }
    }, [isDrawing, signature.draw, handleError]),

    end: useCallback(() => {
      try {
        setIsDrawing(false);
        signature.draw.end();
        setHasChanges(true);
        // Add to history after drawing ends
        setTimeout(() => {
          history.addState(signature.toDataURL('image/png'));
        }, 100);
      } catch (err) {
        handleError(err as Error);
      }
    }, [signature.draw, signature.toDataURL, history.addState, handleError])
  };

  // Enhanced export with loading states
  const enhancedExport = {
    toDataURL: signature.toDataURL,
    
    toBlob: useCallback(async (): Promise<Blob | null> => {
      return new Promise((resolve) => {
        if (!canvasRef.current) {
          resolve(null);
          return;
        }
        canvasRef.current.toBlob(resolve, 'image/png');
      });
    }, [canvasRef]),

    exportAsImage: useCallback(async (filename = 'signature.png') => {
      try {
        setLoading(true);
        clearError();
        const dataUrl = signature.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        handleError(err as Error);
      } finally {
        setLoading(false);
      }
    }, [signature.toDataURL, clearError, handleError]),

    exportAsSVG: signature.exportAsSVG
  };

  // Enhanced settings management
  const enhancedSettings = {
    current: signature.currentOptions,
    
    update: useCallback((newOptions: Partial<SignatureOptions>) => {
      try {
        Object.entries(newOptions).forEach(([key, value]) => {
          switch (key) {
            case 'penColor':
              signature.setPenColor(value as string);
              break;
            case 'penWidth':
              signature.setPenWidth(value as number);
              break;
            case 'backgroundColor':
              signature.setBackgroundColor(value as string);
              break;
            case 'drawingMode':
              signature.setDrawingMode(value as SignatureOptions['drawingMode']);
              break;
            case 'minWidth':
              signature.setMinWidth(value as number);
              break;
            case 'maxWidth':
              signature.setMaxWidth(value as number);
              break;
            case 'velocityFilterWeight':
              signature.setVelocityFilterWeight(value as number);
              break;
          }
        });
      } catch (err) {
        handleError(err as Error);
      }
    }, [signature, handleError]),

    reset: useCallback(() => {
      try {
        enhancedSettings.update(initialOptions);
      } catch (err) {
        handleError(err as Error);
      }
    }, [initialOptions, handleError]),

    penColor: signature.currentOptions.penColor,
    penWidth: signature.currentOptions.penWidth,
    backgroundColor: signature.currentOptions.backgroundColor,
    drawingMode: signature.currentOptions.drawingMode,
    setPenColor: signature.setPenColor,
    setPenWidth: signature.setPenWidth,
    setBackgroundColor: signature.setBackgroundColor,
    setDrawingMode: signature.setDrawingMode
  };

  // Handle canvas resize
  const handleResize = useCallback(() => {
    // Implementation for responsive canvas sizing
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const container = canvas.parentElement;
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      }
    }
  }, [canvasRef]);

  // Enhanced clear with confirmation
  const enhancedClear = useCallback(() => {
    try {
      signature.clear();
      setHasChanges(false);
      history.addState(''); // Add empty state to history
    } catch (err) {
      handleError(err as Error);
    }
  }, [signature, history, handleError]);

  // Enhanced history operations
  const enhancedHistory = {
    undo: useCallback(() => {
      try {
        const previousState = history.undo();
        if (previousState) {
          // Restore canvas state
          setHasChanges(true);
        }
      } catch (err) {
        handleError(err as Error);
      }
    }, [history, handleError]),

    redo: useCallback(() => {
      try {
        const nextState = history.redo();
        if (nextState) {
          // Restore canvas state
          setHasChanges(true);
        }
      } catch (err) {
        handleError(err as Error);
      }
    }, [history, handleError]),

    canUndo: history.canUndo,
    canRedo: history.canRedo,
    clearHistory: history.clearHistory,
    addCheckpoint: useCallback(() => {
      history.addState(signature.toDataURL('image/png'));
    }, [history, signature])
  };

  // Auto-save functionality
  useEffect(() => {
    if (options.autoSave && hasChanges && callbacks.onSave) {
      const timeoutId = setTimeout(() => {
        const dataUrl = signature.toDataURL('image/png');
        callbacks.onSave?.(dataUrl);
        setHasChanges(false);
      }, options.autoSaveDelay || 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [hasChanges, options.autoSave, options.autoSaveDelay, callbacks.onSave, signature]);

  // Notify parent of changes
  useEffect(() => {
    callbacks.onChange?.(signature.isEmpty);
  }, [signature.isEmpty, callbacks]);

  return {
    canvas: {
      ref: canvasRef,
      isEmpty: signature.isEmpty,
      isDrawing,
      draw: enhancedDraw,
      clear: enhancedClear,
      resize: handleResize
    },
    
    history: enhancedHistory,
    
    export: enhancedExport,
    
    settings: enhancedSettings,
    
    state: {
      loading,
      error,
      hasChanges
    },
    
    events: callbacks
  };
}