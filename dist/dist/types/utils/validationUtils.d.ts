import { Point } from '../types';
export declare const validateSignature: (points: Point[]) => boolean;
export declare const getBoundingBox: (points: Point[]) => {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
};
export declare const calculateTotalDistance: (points: Point[]) => number;
export declare const isSignatureEmpty: (dataURL: string) => boolean;
//# sourceMappingURL=validationUtils.d.ts.map