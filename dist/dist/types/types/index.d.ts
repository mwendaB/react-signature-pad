export interface Point {
    x: number;
    y: number;
    time: number;
    pressure: number;
}
export interface SignatureOptions {
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
export type DrawingMode = 'pen' | 'marker' | 'highlighter';
export interface SignaturePadProps {
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
export interface UseSignatureResult {
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
export interface StrokePoint extends Point {
}
/** A stroke is a sequence of points drawn contiguously with a consistent style snapshot. */
export interface StrokeStyleSnapshot {
    penColor: string;
    penWidth: number;
    drawingMode: DrawingMode;
    minWidth: number;
    maxWidth: number;
    velocityFilterWeight: number;
    alpha?: number;
}
export interface Stroke {
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
export interface SerializedStroke {
    id: string;
    points: Array<Pick<StrokePoint, 'x' | 'y' | 'time' | 'pressure'>>;
    style: StrokeStyleSnapshot;
    startedAt: number;
    endedAt: number;
}
export interface SignaturePadHandle {
    clear(): void;
    undo(): void;
    redo(): void;
    toDataURL(type?: string, quality?: number): string;
    toSVG(): string;
    getStrokes(): Stroke[];
    loadStrokes(strokes: SerializedStroke[]): void;
}
export interface SignatureControlsProps {
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
export interface SignatureCustomizationPanelProps {
    options: Partial<SignatureOptions>;
    onOptionsChange: (options: Partial<SignatureOptions>) => void;
    onClose: () => void;
}
export interface UseUndoRedoResult {
    addState: (state: string) => void;
    undo: () => string | undefined;
    redo: () => string | undefined;
    canUndo: boolean;
    canRedo: boolean;
    clearHistory: () => void;
}
//# sourceMappingURL=index.d.ts.map