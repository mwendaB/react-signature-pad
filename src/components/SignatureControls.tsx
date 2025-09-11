
import * as React from 'react';
import { SignatureControlsProps, DrawingMode } from '../types';

interface EnhancedSignatureControlsProps extends SignatureControlsProps {
  onDownload?: () => void;
  onResetPen?: () => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  showEraser?: boolean;
  onEraserMode?: () => void;
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
  onEraserMode
}: EnhancedSignatureControlsProps) => {
  return (
    <div className="signature-controls" role="toolbar" aria-label="Signature controls">
      <div className="controls-left">
        <button 
          onClick={onUndo} 
          disabled={!canUndo}
          className="control-button"
          title="Undo"
          aria-label="Undo"
        >
          ↶
        </button>
        <button 
          onClick={onRedo} 
          disabled={!canRedo}
          className="control-button"
          title="Redo"
          aria-label="Redo"
        >
          ↷
        </button>
        <select 
          value={currentOptions.drawingMode} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onDrawingModeChange(e.target.value as DrawingMode)}
          className="control-select"
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
          className="control-color"
          title="Pen Color"
          aria-label="Pen color"
        />
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={currentOptions.penWidth} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onPenWidthChange(parseInt(e.target.value))}
          className="control-slider"
          title="Pen Width"
          aria-label="Pen width"
        />
        <span className="pen-width-label" aria-label="Pen width value">{currentOptions.penWidth}px</span>
        {onResetPen && (
          <button 
            onClick={onResetPen}
            className="control-button"
            title="Reset Pen Settings"
            aria-label="Reset pen settings"
          >
            Reset
          </button>
        )}
        {showEraser && onEraserMode && (
          <button 
            onClick={onEraserMode}
            className="control-button"
            title="Eraser Mode"
            aria-label="Eraser mode"
          >
            Eraser
          </button>
        )}
        {onToggleGrid && (
          <button 
            onClick={onToggleGrid}
            className="control-button"
            title={showGrid ? "Hide Grid" : "Show Grid"}
            aria-label={showGrid ? "Hide grid" : "Show grid"}
          >
            {showGrid ? "Hide Grid" : "Show Grid"}
          </button>
        )}
      </div>
      <div className="controls-right">
        <button 
          onClick={onClear} 
          className="control-button clear-button"
          title={clearText}
          aria-label="Clear signature"
        >
          {clearText}
        </button>
        {onSave && (
          <button 
            onClick={onSave} 
            disabled={isEmpty}
            className="control-button save-button"
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
            className="control-button upload-button"
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
            className="control-button"
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