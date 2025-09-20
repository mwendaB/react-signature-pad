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
    getStrokes?: () => Stroke[];
    loadStrokes?: (strokes: SerializedStroke[]) => void;
}
/** Single raw point captured during drawing along with pressure & time (already defined as Point). */
interface StrokePoint extends Point {
}
/** A stroke is a sequence of points drawn contiguously with a consistent style snapshot. */
interface StrokeStyleSnapshot {
    penColor: string;
    penWidth: number;
    drawingMode: DrawingMode;
    minWidth: number;
    maxWidth: number;
    velocityFilterWeight: number;
    alpha?: number;
}
interface Stroke {
    id: string;
    points: StrokePoint[];
    style: StrokeStyleSnapshot;
    startedAt: number;
    endedAt: number;
    boundingBox?: {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    };
}
/** Serialized stroke payload suitable for persistence (without runtime-only properties). */
interface SerializedStroke {
    id: string;
    points: Array<Pick<StrokePoint, 'x' | 'y' | 'time' | 'pressure'>>;
    style: StrokeStyleSnapshot;
    startedAt: number;
    endedAt: number;
}
interface SignaturePadHandle {
    clear(): void;
    undo(): void;
    redo(): void;
    toDataURL(type?: string, quality?: number): string;
    toSVG(): string;
    getStrokes(): Stroke[];
    loadStrokes(strokes: SerializedStroke[]): void;
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

declare const SignaturePad: React$1.ForwardRefExoticComponent<SignaturePadProps & React$1.RefAttributes<SignaturePadHandle>>;

interface EnhancedSignaturePadProps {
    canvas?: {
        maxWidth?: number;
        maxHeight?: number;
        placeholder?: React$1.ReactNode;
    };
    drawing?: Partial<SignatureOptions>;
    ui?: {
        theme?: 'default' | 'tailwind';
        showToolbar?: boolean;
        showActionBar?: boolean;
        showSettings?: boolean;
        compactToolbar?: boolean;
    };
    actions?: {
        save?: {
            enabled?: boolean;
            text?: string;
            callback?: (dataUrl: string) => Promise<void> | void;
        };
        upload?: {
            enabled?: boolean;
            text?: string;
            callback?: (dataUrl: string) => Promise<void> | void;
        };
        clear?: {
            enabled?: boolean;
            text?: string;
            callback?: () => void;
        };
    };
    events?: {
        onChange?: (isEmpty: boolean) => void;
        onError?: (error: Error) => void;
        onDrawStart?: () => void;
        onDrawEnd?: () => void;
    };
    className?: string;
    features?: {
        autoSave?: boolean;
        autoSaveDelay?: number;
        maxHistorySize?: number;
        enableKeyboardShortcuts?: boolean;
    };
}
declare const EnhancedSignaturePad: React$1.ForwardRefExoticComponent<EnhancedSignaturePadProps & React$1.RefAttributes<any>>;

interface SignatureCanvasProps {
    canvasRef: React$1.RefObject<HTMLCanvasElement>;
    isEmpty: boolean;
    isDrawing: boolean;
    onDrawStart: (event: MouseEvent | TouchEvent) => void;
    onDrawMove: (event: MouseEvent | TouchEvent) => void;
    onDrawEnd: () => void;
    maxWidth?: number;
    maxHeight?: number;
    theme?: 'default' | 'tailwind';
    className?: string;
    placeholder?: React$1.ReactNode;
    options: SignatureOptions;
}
declare const SignatureCanvas: React$1.FC<SignatureCanvasProps>;

interface SignatureToolbarProps {
    currentOptions: SignatureOptions;
    onPenColorChange: (color: string) => void;
    onPenWidthChange: (width: number) => void;
    onDrawingModeChange: (mode: DrawingMode) => void;
    theme?: 'default' | 'tailwind';
    className?: string;
    compact?: boolean;
}
declare const SignatureToolbar: React$1.FC<SignatureToolbarProps>;

interface SignatureActionBarProps {
    onUndo: () => void;
    onRedo: () => void;
    onClear: () => void;
    onSave?: () => void;
    onUpload?: () => void;
    canUndo: boolean;
    canRedo: boolean;
    isEmpty: boolean;
    loading?: boolean;
    theme?: 'default' | 'tailwind';
    className?: string;
    saveText?: string;
    uploadText?: string;
    clearText?: string;
    showSave?: boolean;
    showUpload?: boolean;
    showClear?: boolean;
}
declare const SignatureActionBar: React$1.FC<SignatureActionBarProps>;

interface SignatureSettingsPanelProps {
    options: Partial<SignatureOptions>;
    onOptionsChange: (options: Partial<SignatureOptions>) => void;
    onClose: () => void;
    theme?: 'default' | 'tailwind';
    className?: string;
}
declare const SignatureSettingsPanel: React$1.FC<SignatureSettingsPanelProps>;

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    icon?: React$1.ReactNode;
    iconPosition?: 'left' | 'right';
    children?: React$1.ReactNode;
}
declare const Button: React$1.FC<ButtonProps>;

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
    presets?: string[];
}
declare const ColorPicker: React$1.FC<ColorPickerProps>;

interface SliderProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    showValue?: boolean;
    unit?: string;
    variant?: 'default' | 'brand';
}
declare const Slider: React$1.FC<SliderProps>;

interface SelectProps extends Omit<React$1.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    options: Array<{
        value: string;
        label: string;
        disabled?: boolean;
    }>;
    label?: string;
    placeholder?: string;
    error?: string;
}
declare const Select: React$1.FC<SelectProps>;

declare const useSignature: (canvasRef: React.RefObject<HTMLCanvasElement>, options: Partial<SignatureOptions>) => UseSignatureResult;

interface UseSignaturePadOptions extends Partial<SignatureOptions> {
    maxHistorySize?: number;
    autoSave?: boolean;
    autoSaveDelay?: number;
}
interface UseSignaturePadResult {
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
declare function useSignaturePad(canvasRef: React.RefObject<HTMLCanvasElement>, options?: UseSignaturePadOptions, callbacks?: {
    onSave?: (dataUrl: string) => Promise<void> | void;
    onChange?: (isEmpty: boolean) => void;
    onError?: (error: Error) => void;
}): UseSignaturePadResult;

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

/**
 * Utility function for combining class names
 * Simple alternative to clsx for combining conditional classes
 */
declare function cn(...inputs: (string | undefined | null | boolean)[]): string;
/**
 * Creates a conditional class name based on a condition
 */
declare function conditionalClass(condition: boolean, trueClass: string, falseClass?: string): string;
/**
 * Merges theme-specific classes
 */
declare function themeClass(theme: 'default' | 'tailwind', defaultClass: string, tailwindClass: string): string;

export { Button, ColorPicker, DrawingMode, EnhancedSignaturePad, Point, Select, SerializedStroke, SignatureActionBar, SignatureCanvas, SignatureControlsProps, SignatureCustomizationPanelProps, SignatureOptions, SignaturePad, SignaturePadHandle, SignaturePadProps, SignatureSettingsPanel, SignatureToolbar, Slider, Stroke, StrokePoint, StrokeStyleSnapshot, UseSignatureResult, UseUndoRedoResult, calculateTotalDistance, cn, conditionalClass, dataURLToBlob, dataURLToFile, downloadDataURL, getBoundingBox, isSignatureEmpty, themeClass, uploadDataURL, useSignature, useSignaturePad, useUndoRedo, validateSignature };
