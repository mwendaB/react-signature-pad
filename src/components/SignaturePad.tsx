import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useSignature } from '../hooks/useSignature';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { SignaturePadProps, SignatureOptions } from '../types';
import SignatureControls from './SignatureControls';
import SignatureCustomizationPanel from './SignatureCustomizationPanel';

const SignaturePad: React.FC<SignaturePadProps> = ({
  onSave,
  onUpload,
  onClear,
  onChange,
  options = {},
  className = '',
  showControls = true,
  showCustomization = true,
  uploadButton = false,
  uploadText = "Upload Signature",
  saveButton = true,
  saveText = "Save Signature",
  clearButton = true,
  clearText = "Clear",
  maxWidth = 800,
  maxHeight = 300,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);
  const [customOptions, setCustomOptions] = useState(options);
  
  const {
    isEmpty,
    draw,
    clear,
    undo,
    redo,
    canUndo,
    canRedo,
    exportAsImage,
    exportAsSVG,
    toDataURL,
    setDrawingMode,
    setPenColor,
    setPenWidth,
    setBackgroundColor,
    setMinWidth,
    setMaxWidth,
    setVelocityFilterWeight,
    currentOptions
  } = useSignature(canvasRef, customOptions);

  const { addState, undo: undoHistory, redo: redoHistory, canUndo: canUndoHistory, canRedo: canRedoHistory } = 
    useUndoRedo(() => toDataURL('image/png'));

  // Handle undo/redo with history
  const handleUndo = useCallback(() => {
    undoHistory();
  }, [undoHistory]);

  const handleRedo = useCallback(() => {
    redoHistory();
  }, [redoHistory]);

  // Add state to history when drawing ends
  useEffect(() => {
    if (!isDrawing && !isEmpty) {
      addState(toDataURL('image/png'));
    }
  }, [isDrawing, isEmpty, addState]);

  // Notify parent when signature changes
  useEffect(() => {
    onChange?.(isEmpty);
  }, [isEmpty, onChange]);

  const handleSave = useCallback(() => {
    const dataUrl = toDataURL('image/png');
    onSave?.(dataUrl);
  }, [toDataURL, onSave]);

  const handleUpload = useCallback(() => {
    const dataUrl = toDataURL('image/png');
    if (onUpload) {
      onUpload(dataUrl);
    } else {
      // Default upload behavior if no callback provided
      const link = document.createElement('a');
      link.download = 'signature.png';
      link.href = dataUrl;
      link.click();
    }
  }, [toDataURL, onUpload]);

  const handleClear = useCallback(() => {
  clear();
  onClear?.();
  addState(toDataURL('image/png'));
  }, [clear, onClear, addState]);

  const handleOptionsChange = useCallback((newOptions: Partial<SignatureOptions>) => {
    setCustomOptions(prev => ({ ...prev, ...newOptions }));
    
    // Apply the changes to the signature hook
    if (newOptions.penColor) setPenColor(newOptions.penColor);
    if (newOptions.penWidth) setPenWidth(newOptions.penWidth);
    if (newOptions.backgroundColor) setBackgroundColor(newOptions.backgroundColor);
    if (newOptions.drawingMode) setDrawingMode(newOptions.drawingMode);
    if (newOptions.minWidth) setMinWidth(newOptions.minWidth);
    if (newOptions.maxWidth) setMaxWidth(newOptions.maxWidth);
    if (newOptions.velocityFilterWeight) setVelocityFilterWeight(newOptions.velocityFilterWeight);
  }, [setPenColor, setPenWidth, setBackgroundColor, setDrawingMode, setMinWidth, setMaxWidth, setVelocityFilterWeight]);

  // Responsive canvas sizing
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const width = Math.min(containerWidth, maxWidth);
        const height = maxHeight;
        
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        
        // Redraw existing signature if any
        if (!isEmpty) {
          const dataUrl = toDataURL('image/png');
          const ctx = canvasRef.current.getContext('2d');
          if (ctx && dataUrl) {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, 0, 0, width, height);
            };
            img.src = dataUrl;
          }
        } else {
          // Clear and redraw background
          const ctx = canvasRef.current.getContext('2d');
          if (ctx && customOptions.backgroundColor) {
            ctx.fillStyle = customOptions.backgroundColor;
            ctx.fillRect(0, 0, width, height);
          }
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isEmpty, toDataURL, maxWidth, maxHeight, customOptions.backgroundColor]);

  return (
    <div 
      className={`react-signature-pad ${className}`} 
      ref={containerRef}
      style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight + 100}px` }}
    >
      {showCustomization && (
        <button 
          className="customize-toggle"
          onClick={() => setShowCustomizationPanel(!showCustomizationPanel)}
        >
          {showCustomizationPanel ? 'Hide Options' : 'Customize'}
        </button>
      )}
      
      {showCustomizationPanel && (
        <SignatureCustomizationPanel
          options={customOptions}
          onOptionsChange={handleOptionsChange}
          onClose={() => setShowCustomizationPanel(false)}
        />
      )}
      
      {showControls && (
        <SignatureControls
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClear={handleClear}
          onSave={saveButton ? handleSave : undefined}
          onUpload={uploadButton ? handleUpload : undefined}
          onDrawingModeChange={setDrawingMode}
          onPenColorChange={setPenColor}
          onPenWidthChange={setPenWidth}
          canUndo={canUndoHistory}
          canRedo={canRedoHistory}
          isEmpty={isEmpty}
          currentOptions={currentOptions}
          saveText={saveText}
          uploadText={uploadText}
          clearText={clearText}
        />
      )}
      
      <div className="signature-canvas-container">
        <canvas
          ref={canvasRef}
          className="signature-canvas"
          onMouseDown={(e) => {
            setIsDrawing(true);
            draw.start(e.nativeEvent);
          }}
          onMouseMove={(e) => {
            if (isDrawing) {
              draw.move(e.nativeEvent);
            }
          }}
          onMouseUp={() => {
            setIsDrawing(false);
            draw.end();
          }}
          onMouseLeave={() => {
            if (isDrawing) {
              setIsDrawing(false);
              draw.end();
            }
          }}
          onTouchStart={(e) => {
            setIsDrawing(true);
            draw.start(e.nativeEvent);
            e.preventDefault();
          }}
          onTouchMove={(e) => {
            if (isDrawing) {
              draw.move(e.nativeEvent);
              e.preventDefault();
            }
          }}
          onTouchEnd={() => {
            setIsDrawing(false);
            draw.end();
          }}
          onTouchCancel={() => {
            setIsDrawing(false);
            draw.end();
          }}
        />
        {isEmpty && (
          <div className="signature-placeholder">
            Sign here
          </div>
        )}
      </div>
    </div>
  );
};

export default SignaturePad;