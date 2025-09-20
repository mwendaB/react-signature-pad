import React from 'react';
import { DrawingMode, SignatureOptions } from '../../types';
interface SignatureToolbarProps {
    currentOptions: SignatureOptions;
    onPenColorChange: (color: string) => void;
    onPenWidthChange: (width: number) => void;
    onDrawingModeChange: (mode: DrawingMode) => void;
    theme?: 'default' | 'tailwind';
    className?: string;
    compact?: boolean;
}
export declare const SignatureToolbar: React.FC<SignatureToolbarProps>;
export {};
//# sourceMappingURL=SignatureToolbar.d.ts.map