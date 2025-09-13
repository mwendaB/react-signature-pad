import { Point } from '../types';
export declare const drawCurve: (ctx: CanvasRenderingContext2D, points: Point[]) => void;
export declare const calculateVelocity: (points: Point[]) => number;
export declare const getPressureBasedWidth: (pressure: number, minWidth: number, maxWidth: number) => number;
export declare const getVelocityBasedWidth: (velocity: number, baseWidth: number, minWidth: number, maxWidth: number) => number;
//# sourceMappingURL=drawingUtils.d.ts.map