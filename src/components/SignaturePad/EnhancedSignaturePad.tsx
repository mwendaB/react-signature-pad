import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { cn, themeClass } from '../../utils/classNames';
import { SignatureCanvas } from './SignatureCanvas';
import { SignatureToolbar } from './SignatureToolbar';
import { SignatureActionBar } from './SignatureActionBar';
import { SignatureSettingsPanel } from './SignatureSettingsPanel';
import { useSignaturePad } from '../../hooks/useSignaturePad';
import { SignatureOptions, DrawingMode } from '../../types';

// New enhanced API with grouped props
export interface EnhancedSignaturePadProps {
  // Canvas configuration
  canvas?: {
    maxWidth?: number;
    maxHeight?: number;
    placeholder?: React.ReactNode;
  };
  
  // Drawing options
  drawing?: Partial<SignatureOptions>;
  
  // UI configuration
  ui?: {
    theme?: 'default' | 'tailwind';
    showToolbar?: boolean;
    showActionBar?: boolean;
    showSettings?: boolean;
    compactToolbar?: boolean;
  };
  
  // Actions configuration
  actions?: {
    save?: {
      enabled?: boolean;
      text?: string;
      callback?: (dataUrl: string) => Promise<void> | void;
    };
    upload?: {
      enabled?: boolean;
      text?: string;
      callback?: (dataUrl: string) => Promise<void> | void;
    };
    clear?: {
      enabled?: boolean;
      text?: string;
      callback?: () => void;
    };
  };
  
  // Event callbacks
  events?: {
    onChange?: (isEmpty: boolean) => void;
    onError?: (error: Error) => void;
    onDrawStart?: () => void;
    onDrawEnd?: () => void;
  };
  
  // Styling
  className?: string;
  
  // Advanced features
  features?: {
    autoSave?: boolean;
    autoSaveDelay?: number;
    maxHistorySize?: number;
    enableKeyboardShortcuts?: boolean;
  };
}

export const EnhancedSignaturePad = forwardRef<any, EnhancedSignaturePadProps>(({ 
  canvas: canvasConfig = {},
  drawing: drawingOptions = {},
  ui: uiConfig = {},
  actions: actionsConfig = {},
  events: eventsConfig = {},
  className,
  features: featuresConfig = {}
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Default configurations
  const {
    maxWidth = 800,
    maxHeight = 300,
    placeholder
  } = canvasConfig;

  const {
    theme = 'default',
    showToolbar = true,
    showActionBar = true,
    showSettings: showSettingsButton = true,
    compactToolbar = false
  } = uiConfig;

  const {
    save: saveConfig = { enabled: true },
    upload: uploadConfig = { enabled: false },
    clear: clearConfig = { enabled: true }
  } = actionsConfig;

  const {
    autoSave = false,
    autoSaveDelay = 1000,
    enableKeyboardShortcuts = true
  } = featuresConfig;

  // Initialize the signature pad hook
  const signaturePad = useSignaturePad(
    canvasRef,
    {
      ...drawingOptions,
      autoSave,
      autoSaveDelay
    },
    {
      onSave: saveConfig.callback,
      onChange: eventsConfig.onChange,
      onError: eventsConfig.onError
    }
  );

  // Imperative handle (exposed to parent ref)
  useImperativeHandle(ref, () => ({
    ...signaturePad,
    // Convenience aliases aligned with SignaturePadHandle naming
    clear: signaturePad.canvas.clear,
    undo: signaturePad.history.undo,
    redo: signaturePad.history.redo,
    toDataURL: signaturePad.export.toDataURL,
    toSVG: signaturePad.export.exportAsSVG,
  }), [signaturePad]);

  // Enhanced event handlers
  const handleDrawStart = useCallback(() => {
    eventsConfig.onDrawStart?.();
  }, [eventsConfig]);

  const handleDrawEnd = useCallback(() => {
    eventsConfig.onDrawEnd?.();
  }, [eventsConfig]);

  const handleSave = useCallback(async () => {
    if (saveConfig.callback) {
      try {
        const dataUrl = signaturePad.export.toDataURL('image/png');
        await saveConfig.callback(dataUrl);
      } catch (error) {
        signaturePad.events.onError?.(error as Error);
      }
    } else {
      // Default save behavior
      signaturePad.export.exportAsImage();
    }
  }, [saveConfig, signaturePad]);

  const handleUpload = useCallback(async () => {
    if (uploadConfig.callback) {
      try {
        const dataUrl = signaturePad.export.toDataURL('image/png');
        await uploadConfig.callback(dataUrl);
      } catch (error) {
        signaturePad.events.onError?.(error as Error);
      }
    } else {
      // Default upload behavior
      signaturePad.export.exportAsImage();
    }
  }, [uploadConfig, signaturePad]);

  const handleClear = useCallback(() => {
    clearConfig.callback?.();
    signaturePad.canvas.clear();
  }, [clearConfig, signaturePad]);

  // Keyboard shortcuts
  React.useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              signaturePad.history.redo();
            } else {
              e.preventDefault();
              signaturePad.history.undo();
            }
            break;
          case 'y':
            e.preventDefault();
            signaturePad.history.redo();
            break;
          case 's':
            e.preventDefault();
            if (saveConfig.enabled) {
              handleSave();
            }
            break;
        }
      } else if (e.key === 'Escape') {
        setShowSettings(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcuts, signaturePad, saveConfig.enabled, handleSave]);

  // Main container classes
  const containerClasses = cn(
    'signature-pad-enhanced relative max-w-full mx-auto',
    themeClass(
      theme,
      'bg-white border border-gray-200 rounded-lg shadow-lg p-6',
      'bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200/60 dark:border-gray-700/60 backdrop-blur-sm p-6'
    ),
    className
  );

  return (
    <div className={containerClasses} style={{ maxWidth: `${maxWidth + 48}px` }}>
      {/* Error Display */}
      {signaturePad.state.error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{signaturePad.state.error}</span>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-0 right-0 z-50 mt-2 mr-2">
          <SignatureSettingsPanel
            options={signaturePad.settings.current}
            onOptionsChange={signaturePad.settings.update}
            onClose={() => setShowSettings(false)}
            theme={theme}
          />
        </div>
      )}

      {/* Header with Settings Toggle */}
      {showSettingsButton && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              themeClass(
                theme,
                'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300',
                'bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 backdrop-blur-sm'
              ),
              showSettings && 'bg-brand-100 text-brand-700 border-brand-300'
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {showSettings ? 'Hide Settings' : 'Settings'}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {/* Drawing Toolbar */}
        {showToolbar && (
          <SignatureToolbar
            currentOptions={signaturePad.settings.current}
            onPenColorChange={signaturePad.settings.setPenColor}
            onPenWidthChange={signaturePad.settings.setPenWidth}
            onDrawingModeChange={signaturePad.settings.setDrawingMode}
            theme={theme}
            compact={compactToolbar}
          />
        )}

        {/* Signature Canvas */}
        <SignatureCanvas
          canvasRef={canvasRef}
          isEmpty={signaturePad.canvas.isEmpty}
          isDrawing={signaturePad.canvas.isDrawing}
          onDrawStart={(e) => {
            handleDrawStart();
            signaturePad.canvas.draw.start(e);
          }}
          onDrawMove={signaturePad.canvas.draw.move}
          onDrawEnd={() => {
            signaturePad.canvas.draw.end();
            handleDrawEnd();
          }}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          theme={theme}
          placeholder={placeholder}
          options={signaturePad.settings.current}
        />

        {/* Action Bar */}
        {showActionBar && (
          <SignatureActionBar
            onUndo={signaturePad.history.undo}
            onRedo={signaturePad.history.redo}
            onClear={handleClear}
            onSave={saveConfig.enabled ? handleSave : undefined}
            onUpload={uploadConfig.enabled ? handleUpload : undefined}
            canUndo={signaturePad.history.canUndo}
            canRedo={signaturePad.history.canRedo}
            isEmpty={signaturePad.canvas.isEmpty}
            loading={signaturePad.state.loading}
            theme={theme}
            saveText={saveConfig.text}
            uploadText={uploadConfig.text}
            clearText={clearConfig.text}
            showSave={saveConfig.enabled}
            showUpload={uploadConfig.enabled}
            showClear={clearConfig.enabled}
          />
        )}
      </div>

      {/* Loading Overlay */}
      {signaturePad.state.loading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-40">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Processing...</span>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      {enableKeyboardShortcuts && (
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+Z</kbd> Undo • 
          <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded ml-1">Ctrl+Y</kbd> Redo • 
          <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded ml-1">Ctrl+S</kbd> Save
        </div>
      )}
    </div>
  );
});

// Display name for devtools
EnhancedSignaturePad.displayName = 'EnhancedSignaturePad';