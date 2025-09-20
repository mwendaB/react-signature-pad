import React from 'react';
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
export declare const SignatureCanvas: React.FC<SignatureCanvasProps>;
export {};
//# sourceMappingURL=SignatureCanvas.d.ts.map