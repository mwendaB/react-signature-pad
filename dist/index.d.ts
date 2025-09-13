import React$1 from 'react';

interface Point {
    x: number;
    y: number;
    time: number;
    pressure: number;
}
interface SignatureOptions {
    width: number;
    height: number;
    penColor: string;
    penWidth: number;
    backgroundColor: string;
    drawingMode: DrawingMode;
    minWidth: number;
    maxWidth: number;
    velocityFilterWeight: number;
}
type DrawingMode = 'pen' | 'marker' | 'highlighter';
interface SignaturePadProps {
    onSave?: (signature: string) => void;
    onUpload?: (signature: string) => void;
    onClear?: () => void;
    onChange?: (isEmpty: boolean) => void;
    options?: Partial<SignatureOptions>;
    className?: string;
    showControls?: boolean;
    showCustomization?: boolean;
    uploadButton?: boolean;
    uploadText?: string;
    saveButton?: boolean;
    saveText?: string;
    clearButton?: boolean;
    clearText?: string;
    maxWidth?: number;
    maxHeight?: number;
    /** Visual theme integration. "default" uses library CSS; "tailwind" adds utility classes if consumer has Tailwind configured. */
    theme?: 'default' | 'tailwind';
    /** Show built-in dark mode toggle (works with both themes). */
    showDarkModeToggle?: boolean;
}
interface UseSignatureResult {
    isEmpty: boolean;
    draw: {
        start: (event: MouseEvent | TouchEvent) => void;
        move: (event: MouseEvent | TouchEvent) => void;
        end: () => void;
    };
    clear: () => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    exportAsImage: (filename?: string) => void;
    exportAsSVG: () => string;
    toDataURL: (type?: string, quality?: number) => string;
    setDrawingMode: (mode: DrawingMode) => void;
    setPenColor: (color: string) => void;
    setPenWidth: (width: number) => void;
    setBackgroundColor: (color: string) => void;
    setMinWidth: (width: number) => void;
    setMaxWidth: (width: number) => void;
    setVelocityFilterWeight: (weight: number) => void;
    currentOptions: SignatureOptions;
}
interface SignatureControlsProps {
    onUndo: () => void;
    onRedo: () => void;
    onClear: () => void;
    onSave?: () => void;
    onUpload?: () => void;
    onDrawingModeChange: (mode: DrawingMode) => void;
    onPenColorChange: (color: string) => void;
    onPenWidthChange: (width: number) => void;
    canUndo: boolean;
    canRedo: boolean;
    isEmpty: boolean;
    currentOptions: SignatureOptions;
    saveText?: string;
    uploadText?: string;
    clearText?: string;
}
interface SignatureCustomizationPanelProps {
    options: Partial<SignatureOptions>;
    onOptionsChange: (options: Partial<SignatureOptions>) => void;
    onClose: () => void;
}
interface UseUndoRedoResult {
    addState: (state: string) => void;
    undo: () => string | undefined;
    redo: () => string | undefined;
    canUndo: boolean;
    canRedo: boolean;
    clearHistory: () => void;
}

declare const SignaturePad: React$1.FC<SignaturePadProps>;

declare const useSignature: (canvasRef: React.RefObject<HTMLCanvasElement>, options: Partial<SignatureOptions>) => UseSignatureResult;

declare const useUndoRedo: (getCurrentState: () => string) => UseUndoRedoResult;

declare const dataURLToBlob: (dataURL: string) => Blob;
declare const downloadDataURL: (dataURL: string, filename: string) => void;
declare const dataURLToFile: (dataURL: string, filename: string) => File;
declare const uploadDataURL: (dataURL: string, url: string, fieldName?: string) => Promise<Response>;

declare const validateSignature: (points: Point[]) => boolean;
declare const getBoundingBox: (points: Point[]) => {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
};
declare const calculateTotalDistance: (points: Point[]) => number;
declare const isSignatureEmpty: (dataURL: string) => boolean;

export { DrawingMode, Point, SignatureControlsProps, SignatureCustomizationPanelProps, SignatureOptions, SignaturePad, SignaturePadProps, UseSignatureResult, UseUndoRedoResult, calculateTotalDistance, dataURLToBlob, dataURLToFile, downloadDataURL, getBoundingBox, isSignatureEmpty, uploadDataURL, useSignature, useUndoRedo, validateSignature };
