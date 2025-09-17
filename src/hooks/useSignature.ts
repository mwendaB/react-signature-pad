import { useRef, useCallback, useEffect, useState } from 'react';
import { Point, SignatureOptions, DrawingMode, UseSignatureResult } from '../types';
import { drawCurve, calculateVelocity, getPressureBasedWidth, getVelocityBasedWidth } from '../utils/drawingUtils';

export const useSignature = (
  canvasRef: React.RefObject<HTMLCanvasElement>, 
  options: Partial<SignatureOptions>
): UseSignatureResult => {
  const pointsRef = useRef<Point[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [currentOptions, setCurrentOptions] = useState<SignatureOptions>({
    width: options.width || 800,
    height: options.height || 300,
    penColor: options.penColor || '#000000',
    penWidth: options.penWidth || 2,
    backgroundColor: options.backgroundColor || '#ffffff',
    drawingMode: options.drawingMode || 'pen',
    minWidth: options.minWidth || 0.5,
    maxWidth: options.maxWidth || 2.5,
    velocityFilterWeight: options.velocityFilterWeight || 0.7,
  });

  // Update options when they actually change (avoid identity churn causing re-renders)
  const prevOptionsRef = useRef<Partial<SignatureOptions> | null>(null);
  useEffect(() => {
    const keys: (keyof SignatureOptions)[] = [
      'width','height','penColor','penWidth','backgroundColor','drawingMode','minWidth','maxWidth','velocityFilterWeight'
    ];
    let changed = false;
    const prev = prevOptionsRef.current || {};
    for (const k of keys) {
      if (options[k] !== undefined && options[k] !== prev[k]) {
        changed = true; break;
      }
    }
    if (changed) {
      setCurrentOptions(prevState => ({
        ...prevState,
        ...options,
        width: options.width || prevState.width,
        height: options.height || prevState.height,
      }));
      prevOptionsRef.current = options;
    }
  }, [options]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set initial styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = currentOptions.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setIsEmpty(true);
  }, [canvasRef, currentOptions.backgroundColor]);

  const draw = {
    start: useCallback((event: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      
      const point: Point = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        time: Date.now(),
        pressure: 'pressure' in event ? (event as any).pressure : 0.5
      };
      
      pointsRef.current = [point];
      setIsEmpty(false);
      
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    }, [canvasRef]),
    
    move: useCallback((event: MouseEvent | TouchEvent) => {
      if (pointsRef.current.length === 0) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      
      const newPoint: Point = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        time: Date.now(),
        pressure: 'pressure' in event ? (event as any).pressure : 0.5
      };
      
      const points = pointsRef.current;
      points.push(newPoint);
      
      // Calculate line width based on velocity or pressure
      const velocity = calculateVelocity(points);
      const baseWidth = currentOptions.penWidth;
      
      let width = baseWidth;
      if (currentOptions.drawingMode === 'marker') {
        width = Math.max(currentOptions.minWidth, baseWidth - (velocity * baseWidth) / 3);
      } else if (currentOptions.drawingMode === 'highlighter') {
        width = baseWidth + 2;
        ctx.globalAlpha = 0.5;
      } else {
        width = Math.max(currentOptions.minWidth, Math.min(currentOptions.maxWidth, baseWidth - (velocity * baseWidth) / 5));
      }
      
      ctx.lineWidth = width;
      ctx.strokeStyle = currentOptions.penColor;
      
      // Draw smooth curve
      drawCurve(ctx, points);
      
      // Reset alpha if using highlighter
      if (currentOptions.drawingMode === 'highlighter') {
        ctx.globalAlpha = 1;
      }
      
      // Keep only recent points for performance
      if (points.length > 5) {
        pointsRef.current = points.slice(-5);
      }
    }, [canvasRef, currentOptions]),
    
    end: useCallback(() => {
      pointsRef.current = [];
    }, [])
  };

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = currentOptions.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setIsEmpty(true);
    pointsRef.current = [];
  }, [canvasRef, currentOptions.backgroundColor]);

  const toDataURL = useCallback((type?: string, quality?: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isEmpty) return '';
    return canvas.toDataURL(type, quality);
  }, [canvasRef, isEmpty]);

  const exportAsImage = useCallback((filename: string = 'signature') => {
    const dataUrl = toDataURL('image/png');
    if (!dataUrl) return;
    
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  }, [toDataURL]);

  const exportAsSVG = useCallback(() => {
    // Implementation for SVG export
    return ''; // Placeholder
  }, []);

  // Options setters
  const setDrawingMode = useCallback((mode: DrawingMode) => {
    setCurrentOptions(prev => ({ ...prev, drawingMode: mode }));
  }, []);

  const setPenColor = useCallback((color: string) => {
    setCurrentOptions(prev => ({ ...prev, penColor: color }));
  }, []);

  const setPenWidth = useCallback((width: number) => {
    setCurrentOptions(prev => ({ ...prev, penWidth: width }));
  }, []);

  const setBackgroundColor = useCallback((color: string) => {
    setCurrentOptions(prev => ({ ...prev, backgroundColor: color }));
    
    // Redraw background if canvas exists
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Redraw signature if it exists
        if (!isEmpty) {
          const dataUrl = toDataURL('image/png');
          if (dataUrl) {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, 0, 0);
            };
            img.src = dataUrl;
          }
        }
      }
    }
  }, [canvasRef, isEmpty, toDataURL]);

  const setMinWidth = useCallback((width: number) => {
    setCurrentOptions(prev => ({ ...prev, minWidth: width }));
  }, []);

  const setMaxWidth = useCallback((width: number) => {
    setCurrentOptions(prev => ({ ...prev, maxWidth: width }));
  }, []);

  const setVelocityFilterWeight = useCallback((weight: number) => {
    setCurrentOptions(prev => ({ ...prev, velocityFilterWeight: weight }));
  }, []);

  return {
    isEmpty,
    draw,
    clear,
    undo: () => {}, // Placeholder - would be implemented with useUndoRedo
    redo: () => {}, // Placeholder
    canUndo: false, // Placeholder
    canRedo: false, // Placeholder
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
  };
};