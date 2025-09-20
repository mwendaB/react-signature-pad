import { useRef, useCallback, useEffect, useState } from 'react';
import { 
  Point, 
  SignatureOptions, 
  DrawingMode, 
  UseSignatureResult,
  Stroke,
  StrokePoint,
  StrokeStyleSnapshot,
  SerializedStroke
} from '../types';
import { drawCurve, calculateVelocity } from '../utils/drawingUtils';
import { v4 as uuid } from 'uuid';

export const useSignature = (
  canvasRef: React.RefObject<HTMLCanvasElement>, 
  options: Partial<SignatureOptions>
): UseSignatureResult => {
  const pointsRef = useRef<StrokePoint[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const strokesRef = useRef<Stroke[]>([]); // committed strokes
  const redoStackRef = useRef<Stroke[]>([]);
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

  const commitCurrentStroke = useCallback(() => {
    if (currentStrokeRef.current && currentStrokeRef.current.points.length > 1) {
      const stroke = currentStrokeRef.current;
      // compute bounding box
      let minX = stroke.points[0].x, minY = stroke.points[0].y, maxX = stroke.points[0].x, maxY = stroke.points[0].y;
      for (const p of stroke.points) {
        if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y; if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y;
      }
      stroke.boundingBox = { minX, minY, maxX, maxY };
      strokesRef.current.push(stroke);
      redoStackRef.current = []; // invalidates redo history after new draw
    }
    currentStrokeRef.current = null;
  }, []);

  const redrawAll = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = currentOptions.backgroundColor; ctx.fillRect(0,0,canvas.width,canvas.height);
    for (const stroke of strokesRef.current) {
      if (stroke.points.length < 2) continue;
      ctx.save();
      if (stroke.style.drawingMode === 'highlighter') ctx.globalAlpha = stroke.style.alpha ?? 0.5;
      ctx.strokeStyle = stroke.style.penColor;
      ctx.lineWidth = stroke.style.penWidth; // will be dynamically altered inside drawCurve path logic if needed
      drawCurve(ctx, stroke.points as Point[]);
      ctx.restore();
    }
    setIsEmpty(strokesRef.current.length === 0);
  }, [canvasRef, currentOptions.backgroundColor]);

  const draw = {
    start: useCallback((event: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current; if (!canvas) return;
      const ctx = canvas.getContext('2d'); if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      const point: StrokePoint = { x: clientX - rect.left, y: clientY - rect.top, time: Date.now(), pressure: 'pressure' in event ? (event as any).pressure : 0.5 };
      pointsRef.current = [point];
      const style: StrokeStyleSnapshot = {
        penColor: currentOptions.penColor,
        penWidth: currentOptions.penWidth,
        drawingMode: currentOptions.drawingMode,
        minWidth: currentOptions.minWidth,
        maxWidth: currentOptions.maxWidth,
        velocityFilterWeight: currentOptions.velocityFilterWeight,
        alpha: currentOptions.drawingMode === 'highlighter' ? 0.5 : 1
      };
      currentStrokeRef.current = { id: uuid(), points: [point], style, startedAt: Date.now(), endedAt: Date.now() };
      setIsEmpty(false);
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    }, [canvasRef, currentOptions]),
    move: useCallback((event: MouseEvent | TouchEvent) => {
      if (!currentStrokeRef.current) return;
      const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      const newPoint: StrokePoint = { x: clientX - rect.left, y: clientY - rect.top, time: Date.now(), pressure: 'pressure' in event ? (event as any).pressure : 0.5 };
      pointsRef.current.push(newPoint);
      currentStrokeRef.current.points.push(newPoint);
      currentStrokeRef.current.endedAt = newPoint.time;
      // dynamic width calculation
      const velocity = calculateVelocity(pointsRef.current);
      const baseWidth = currentStrokeRef.current.style.penWidth;
      let width = baseWidth;
      if (currentStrokeRef.current.style.drawingMode === 'marker') {
        width = Math.max(currentStrokeRef.current.style.minWidth, baseWidth - (velocity * baseWidth) / 3);
      } else if (currentStrokeRef.current.style.drawingMode === 'highlighter') {
        width = baseWidth + 2; ctx.globalAlpha = currentStrokeRef.current.style.alpha ?? 0.5;
      } else {
        width = Math.max(currentStrokeRef.current.style.minWidth, Math.min(currentStrokeRef.current.style.maxWidth, baseWidth - (velocity * baseWidth) / 5));
      }
      ctx.lineWidth = width; ctx.strokeStyle = currentStrokeRef.current.style.penColor;
      drawCurve(ctx, pointsRef.current as Point[]);
      if (currentStrokeRef.current.style.drawingMode === 'highlighter') ctx.globalAlpha = 1;
      if (pointsRef.current.length > 8) {
        pointsRef.current = pointsRef.current.slice(-6); // keep small tail for smoothing
      }
    }, [canvasRef]),
    end: useCallback(() => {
      commitCurrentStroke();
      pointsRef.current = [];
    }, [commitCurrentStroke])
  };

  const clear = useCallback(() => {
    strokesRef.current = [];
    redoStackRef.current = [];
    currentStrokeRef.current = null;
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = currentOptions.backgroundColor; ctx.fillRect(0,0,canvas.width,canvas.height);
    setIsEmpty(true);
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
    // Build SVG paths from strokes
    if (!canvasRef.current) return '';
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const pathParts: string[] = [];
    for (const stroke of strokesRef.current) {
      if (stroke.points.length < 2) continue;
      const d: string[] = [];
      const pts = stroke.points;
      d.push(`M ${pts[0].x} ${pts[0].y}`);
      for (let i=1;i<pts.length-2;i++) {
        const cpx = (pts[i].x + pts[i+1].x)/2;
        const cpy = (pts[i].y + pts[i+1].y)/2;
        d.push(`Q ${pts[i].x} ${pts[i].y} ${cpx} ${cpy}`);
      }
      const last = pts[pts.length-1];
      const penultimate = pts[pts.length-2];
      d.push(`Q ${penultimate.x} ${penultimate.y} ${last.x} ${last.y}`);
      const opacity = stroke.style.drawingMode === 'highlighter' ? (stroke.style.alpha ?? 0.5) : 1;
      pathParts.push(`<path d="${d.join(' ')}" fill="none" stroke="${stroke.style.penColor}" stroke-linecap="round" stroke-linejoin="round" stroke-width="${stroke.style.penWidth}" stroke-opacity="${opacity}" />`);
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:${currentOptions.backgroundColor}">${pathParts.join('')}</svg>`;
  }, [canvasRef, currentOptions.backgroundColor]);

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
    // Simply redraw all strokes on new background
    requestAnimationFrame(() => redrawAll());
  }, [redrawAll]);

  // Undo / Redo
  const undo = useCallback(() => {
    commitCurrentStroke();
    const stroke = strokesRef.current.pop();
    if (stroke) {
      redoStackRef.current.push(stroke);
      redrawAll();
    }
  }, [commitCurrentStroke, redrawAll]);

  const redo = useCallback(() => {
    const stroke = redoStackRef.current.pop();
    if (stroke) {
      strokesRef.current.push(stroke);
      redrawAll();
    }
  }, [redrawAll]);

  const canUndo = strokesRef.current.length > 0 || !!currentStrokeRef.current;
  const canRedo = redoStackRef.current.length > 0;

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
    currentOptions,
    // New advanced APIs (internal for now; will be documented with imperative handle)
    getStrokes: () => strokesRef.current.slice(),
    loadStrokes: (serialized: SerializedStroke[]) => {
      strokesRef.current = serialized.map(s => ({
        ...s,
        points: s.points.map(p => ({ ...p })),
        style: { ...s.style },
        boundingBox: undefined // will be recomputed on redraw if needed
      }));
      redoStackRef.current = [];
      redrawAll();
    }
  };
};