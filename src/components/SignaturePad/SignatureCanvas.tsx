import React, { useEffect, useRef } from 'react';
import { cn, themeClass } from '../../utils/classNames';
import { SignatureOptions } from '../../types';

interface SignatureCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isEmpty: boolean;
  isDrawing: boolean;
  onDrawStart: (event: MouseEvent | TouchEvent) => void;
  onDrawMove: (event: MouseEvent | TouchEvent) => void;
  onDrawEnd: () => void;
  maxWidth?: number;
  maxHeight?: number;
  theme?: 'default' | 'tailwind';
  className?: string;
  placeholder?: React.ReactNode;
  options: SignatureOptions;
}

const defaultPlaceholder = (
  <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none select-none">
    <svg className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
    <p className="text-base font-medium mb-1">Sign here</p>
    <p className="text-sm text-gray-300 dark:text-gray-600">Draw your signature in the box above</p>
  </div>
);

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  canvasRef,
  isEmpty,
  isDrawing,
  onDrawStart,
  onDrawMove,
  onDrawEnd,
  maxWidth = 800,
  maxHeight = 300,
  theme = 'default',
  className,
  placeholder = defaultPlaceholder,
  options
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle canvas resizing
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const width = Math.min(containerWidth, maxWidth);
        const height = maxHeight;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Save current canvas data
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        
        // Resize canvas
        canvas.width = width;
        canvas.height = height;
        
        // Restore canvas data if it existed
        if (ctx && imageData && !isEmpty) {
          ctx.putImageData(imageData, 0, 0);
        } else if (ctx && options.backgroundColor) {
          // Set background color
          ctx.fillStyle = options.backgroundColor;
          ctx.fillRect(0, 0, width, height);
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef, maxWidth, maxHeight, isEmpty, options.backgroundColor]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    onDrawStart(e.nativeEvent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      onDrawMove(e.nativeEvent);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      onDrawEnd();
    }
  };

  const handleMouseLeave = () => {
    if (isDrawing) {
      onDrawEnd();
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    onDrawStart(e.nativeEvent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isDrawing) {
      onDrawMove(e.nativeEvent);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isDrawing) {
      onDrawEnd();
    }
  };

  const containerClasses = cn(
    'relative',
    themeClass(
      theme,
      'signature-canvas-container',
      'sig-pad-canvas-container'
    ),
    className
  );

  const canvasClasses = cn(
    'block cursor-crosshair touch-none',
    themeClass(
      theme,
      'signature-canvas',
      'sig-pad-canvas'
    ),
    isDrawing && 'cursor-grabbing'
  );

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      style={{ maxWidth: `${maxWidth}px`, height: `${maxHeight}px` }}
    >
      <canvas
        ref={canvasRef}
        className={canvasClasses}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        role="img"
        aria-label="Signature canvas"
        aria-describedby="signature-instructions"
      />
      
      {isEmpty && (
        <div 
          className={cn(
            'absolute inset-0 flex items-center justify-center pointer-events-none',
            themeClass(
              theme,
              'signature-placeholder',
              'sig-pad-placeholder'
            )
          )}
        >
          {placeholder}
        </div>
      )}
      
      {/* Screen reader instructions */}
      <div id="signature-instructions" className="sr-only">
        Use mouse or touch to draw your signature in this area. 
        Use the controls below to undo, clear, or save your signature.
      </div>
    </div>
  );
};