
import * as React from 'react';
import { SignatureControlsProps, DrawingMode } from '../types';

interface EnhancedSignatureControlsProps extends SignatureControlsProps {
  onDownload?: () => void;
  onResetPen?: () => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  showEraser?: boolean;
  onEraserMode?: () => void;
  theme?: 'default' | 'tailwind';
}

const SignatureControls: React.FC<EnhancedSignatureControlsProps> = ({
  onUndo,
  onRedo,
  onClear,
  onSave,
  onUpload,
  onDrawingModeChange,
  onPenColorChange,
  onPenWidthChange,
  canUndo,
  canRedo,
  isEmpty,
  currentOptions,
  saveText = 'Save',
  uploadText = 'Upload',
  clearText = 'Clear',
  onDownload,
  onResetPen,
  showGrid = false,
  onToggleGrid,
  showEraser = false,
  onEraserMode,
  theme = 'default'
}: EnhancedSignatureControlsProps) => {
  const btnCls = theme === 'tailwind'
    ? 'sig-pad-toolbar-btn'
    : 'control-button';
  const containerCls = theme === 'tailwind'
    ? 'signature-controls flex flex-wrap gap-2 mb-2'
    : 'signature-controls';
  return (
    <div className={containerCls} role="toolbar" aria-label="Signature controls">
      <div className="controls-left flex items-center gap-2 flex-wrap">
        <button 
          onClick={onUndo} 
          disabled={!canUndo}
          className={btnCls}
          title="Undo"
          aria-label="Undo"
        >
          ↶
        </button>
        <button 
          onClick={onRedo} 
          disabled={!canRedo}
          className={btnCls}
          title="Redo"
          aria-label="Redo"
        >
          ↷
        </button>
        <select 
          value={currentOptions.drawingMode} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onDrawingModeChange(e.target.value as DrawingMode)}
          className={theme === 'tailwind' ? 'control-select h-8 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm px-2' : 'control-select'}
          aria-label="Drawing mode"
        >
          <option value="pen">Pen</option>
          <option value="marker">Marker</option>
          <option value="highlighter">Highlighter</option>
          {showEraser && <option value="eraser">Eraser</option>}
        </select>
        <input 
          type="color" 
          value={currentOptions.penColor} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onPenColorChange(e.target.value)}
          className={theme === 'tailwind' ? 'control-color h-8 w-10 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden' : 'control-color'}
          title="Pen Color"
          aria-label="Pen color"
        />
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={currentOptions.penWidth} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onPenWidthChange(parseInt(e.target.value))}
          className={theme === 'tailwind' ? 'control-slider cursor-pointer accent-brand-600' : 'control-slider'}
          title="Pen Width"
          aria-label="Pen width"
        />
        <span className="pen-width-label" aria-label="Pen width value">{currentOptions.penWidth}px</span>
        {onResetPen && (
          <button 
            onClick={onResetPen}
            className={btnCls}
            title="Reset Pen Settings"
            aria-label="Reset pen settings"
          >
            Reset
          </button>
        )}
        {showEraser && onEraserMode && (
          <button 
            onClick={onEraserMode}
            className={btnCls}
            title="Eraser Mode"
            aria-label="Eraser mode"
          >
            Eraser
          </button>
        )}
        {onToggleGrid && (
          <button 
            onClick={onToggleGrid}
            className={btnCls}
            title={showGrid ? "Hide Grid" : "Show Grid"}
            aria-label={showGrid ? "Hide grid" : "Show grid"}
          >
            {showGrid ? "Hide Grid" : "Show Grid"}
          </button>
        )}
      </div>
      <div className="controls-right flex items-center gap-2 flex-wrap">
        <button 
          onClick={onClear} 
          className={`${btnCls} clear-button`}
          title={clearText}
          aria-label="Clear signature"
        >
          {clearText}
        </button>
        {onSave && (
          <button 
            onClick={onSave} 
            disabled={isEmpty}
            className={`${btnCls} save-button`}
            title={saveText}
            aria-label="Save signature"
          >
            {saveText}
          </button>
        )}
        {onUpload && (
          <button 
            onClick={onUpload} 
            disabled={isEmpty}
            className={`${btnCls} upload-button`}
            title={uploadText}
            aria-label="Upload signature"
          >
            {uploadText}
          </button>
        )}
        {onDownload && (
          <button 
            onClick={onDownload}
            disabled={isEmpty}
            className={btnCls}
            title="Download signature"
            aria-label="Download signature"
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
};

export default SignatureControls;