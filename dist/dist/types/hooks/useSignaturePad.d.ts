/// <reference types="react" />
import { SignatureOptions } from '../types';
export interface UseSignaturePadOptions extends Partial<SignatureOptions> {
    maxHistorySize?: number;
    autoSave?: boolean;
    autoSaveDelay?: number;
}
export interface UseSignaturePadResult {
    canvas: {
        ref: React.RefObject<HTMLCanvasElement>;
        isEmpty: boolean;
        isDrawing: boolean;
        draw: {
            start: (event: MouseEvent | TouchEvent) => void;
            move: (event: MouseEvent | TouchEvent) => void;
            end: () => void;
        };
        clear: () => void;
        resize: () => void;
    };
    history: {
        undo: () => void;
        redo: () => void;
        canUndo: boolean;
        canRedo: boolean;
        clearHistory: () => void;
        addCheckpoint: () => void;
    };
    export: {
        toDataURL: (type?: string, quality?: number) => string;
        toBlob: () => Promise<Blob | null>;
        exportAsImage: (filename?: string) => void;
        exportAsSVG: () => string;
    };
    settings: {
        current: SignatureOptions;
        update: (options: Partial<SignatureOptions>) => void;
        reset: () => void;
        penColor: string;
        penWidth: number;
        backgroundColor: string;
        drawingMode: SignatureOptions['drawingMode'];
        setPenColor: (color: string) => void;
        setPenWidth: (width: number) => void;
        setBackgroundColor: (color: string) => void;
        setDrawingMode: (mode: SignatureOptions['drawingMode']) => void;
    };
    state: {
        loading: boolean;
        error: string | null;
        hasChanges: boolean;
    };
    events: {
        onSave?: (dataUrl: string) => Promise<void> | void;
        onChange?: (isEmpty: boolean) => void;
        onError?: (error: Error) => void;
    };
    getStrokes?: () => any[];
    loadStrokes?: (strokes: any[]) => void;
}
export declare function useSignaturePad(canvasRef: React.RefObject<HTMLCanvasElement>, options?: UseSignaturePadOptions, callbacks?: {
    onSave?: (dataUrl: string) => Promise<void> | void;
    onChange?: (isEmpty: boolean) => void;
    onError?: (error: Error) => void;
}): UseSignaturePadResult;
//# sourceMappingURL=useSignaturePad.d.ts.map