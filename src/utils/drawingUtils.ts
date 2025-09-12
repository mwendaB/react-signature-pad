import { Point } from '../types';

export const drawCurve = (ctx: CanvasRenderingContext2D, points: Point[]): void => {
  if (points.length < 3) {
    const point = points[0];
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 2; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }

  ctx.quadraticCurveTo(
    points[points.length - 2].x,
    points[points.length - 2].y,
    points[points.length - 1].x,
    points[points.length - 1].y
  );

  ctx.stroke();
};

export const calculateVelocity = (points: Point[]): number => {
  if (points.length < 2) return 0;

  const lastPoint = points[points.length - 1];
  const secondLastPoint = points[points.length - 2];
  
  const distance = Math.sqrt(
    Math.pow(lastPoint.x - secondLastPoint.x, 2) + 
    Math.pow(lastPoint.y - secondLastPoint.y, 2)
  );
  
  const timeDiff = lastPoint.time - secondLastPoint.time;
  
  return timeDiff > 0 ? distance / timeDiff : 0;
};

export const getPressureBasedWidth = (
  pressure: number, 
  minWidth: number, 
  maxWidth: number
): number => {
  return minWidth + (maxWidth - minWidth) * pressure;
};

export const getVelocityBasedWidth = (
  velocity: number, 
  baseWidth: number, 
  minWidth: number, 
  maxWidth: number
): number => {
  const newWidth = baseWidth - (velocity * baseWidth) / 5;
  return Math.max(minWidth, Math.min(maxWidth, newWidth));
};