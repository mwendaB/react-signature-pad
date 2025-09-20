# API Documentation - Enhanced React Signature Pad

## Components

### EnhancedSignaturePad

The main signature pad component with the new enhanced API.

```typescript
interface EnhancedSignaturePadProps {
  canvas?: CanvasConfig;
  drawing?: Partial<SignatureOptions>;
  ui?: UIConfig;
  actions?: ActionsConfig;
  events?: EventsConfig;
  className?: string;
  features?: FeaturesConfig;
}
```

#### CanvasConfig

```typescript
interface CanvasConfig {
  maxWidth?: number;        // Maximum canvas width (default: 800)
  maxHeight?: number;       // Maximum canvas height (default: 300)
  placeholder?: React.ReactNode; // Custom placeholder content
}
```

#### SignatureOptions (Drawing Config)

```typescript
interface SignatureOptions {
  width: number;                    // Canvas width
  height: number;                   // Canvas height
  penColor: string;                 // Pen color (default: '#000000')
  penWidth: number;                 // Pen width (default: 2)
  backgroundColor: string;          // Background color (default: '#ffffff')
  drawingMode: DrawingMode;         // Drawing mode (default: 'pen')
  minWidth: number;                 // Minimum line width (default: 0.5)
  maxWidth: number;                 // Maximum line width (default: 2.5)
  velocityFilterWeight: number;     // Velocity sensitivity (default: 0.7)
}

type DrawingMode = 'pen' | 'marker' | 'highlighter';
```

#### UIConfig

```typescript
interface UIConfig {
  theme?: 'default' | 'tailwind';  // Visual theme (default: 'default')
  showToolbar?: boolean;           // Show drawing toolbar (default: true)
  showActionBar?: boolean;         // Show action buttons (default: true)
  showSettings?: boolean;          // Show settings panel (default: true)
  compactToolbar?: boolean;        // Use compact toolbar (default: false)
}
```

#### ActionsConfig

```typescript
interface ActionsConfig {
  save?: ActionConfig;
  upload?: ActionConfig;
  clear?: ActionConfig;
}

interface ActionConfig {
  enabled?: boolean;                           // Enable this action
  text?: string;                               // Button text
  callback?: (dataUrl: string) => Promise<void> | void; // Action callback
}
```

#### EventsConfig

```typescript
interface EventsConfig {
  onChange?: (isEmpty: boolean) => void;       // Canvas empty state changed
  onError?: (error: Error) => void;           // Error occurred
  onDrawStart?: () => void;                    // Drawing started
  onDrawEnd?: () => void;                      // Drawing ended
}
```

#### FeaturesConfig

```typescript
interface FeaturesConfig {
  autoSave?: boolean;              // Enable auto-save (default: false)
  autoSaveDelay?: number;          // Auto-save delay in ms (default: 1000)
  maxHistorySize?: number;         // Maximum undo history (default: 50)
  enableKeyboardShortcuts?: boolean; // Enable keyboard shortcuts (default: true)
}
```

### SignaturePad (Legacy)

Backward-compatible component that wraps EnhancedSignaturePad.

```typescript
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
  theme?: 'default' | 'tailwind';
  showDarkModeToggle?: boolean;
}
```

## Sub-Components

### SignatureCanvas

Dedicated canvas component for drawing operations.

```typescript
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
```

### SignatureToolbar

Drawing tools and pen controls.

```typescript
interface SignatureToolbarProps {
  currentOptions: SignatureOptions;
  onPenColorChange: (color: string) => void;
  onPenWidthChange: (width: number) => void;
  onDrawingModeChange: (mode: DrawingMode) => void;
  theme?: 'default' | 'tailwind';
  className?: string;
  compact?: boolean;
}
```

### SignatureActionBar

Action buttons (save, clear, undo, redo).

```typescript
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
```

### SignatureSettingsPanel

Advanced settings with progressive disclosure.

```typescript
interface SignatureSettingsPanelProps {
  options: Partial<SignatureOptions>;
  onOptionsChange: (options: Partial<SignatureOptions>) => void;
  onClose: () => void;
  theme?: 'default' | 'tailwind';
  className?: string;
}
```

## UI Components

### Button

Reusable button component with variant system.

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
}
```

### ColorPicker

Color selection component with presets.

```typescript
interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  presets?: string[]; // Default color swatches
}
```

### Slider

Range input component with labels.

```typescript
interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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
```

### Select

Styled select component.

```typescript
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  label?: string;
  placeholder?: string;
  error?: string;
}
```

## Hooks

### useSignaturePad

Comprehensive hook combining all signature functionality.

```typescript
function useSignaturePad(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options?: UseSignaturePadOptions,
  callbacks?: {
    onSave?: (dataUrl: string) => Promise<void> | void;
    onChange?: (isEmpty: boolean) => void;
    onError?: (error: Error) => void;
  }
): UseSignaturePadResult;

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
}
```

### useSignature

Original signature functionality hook.

```typescript
function useSignature(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options?: Partial<SignatureOptions>
): UseSignatureResult;
```

### useUndoRedo

Undo/redo functionality hook.

```typescript
function useUndoRedo(
  getCurrentState: () => string
): UseUndoRedoResult;

interface UseUndoRedoResult {
  addState: (state: string) => void;
  undo: () => string | undefined;
  redo: () => string | undefined;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
}
```

## Keyboard Shortcuts

When `features.enableKeyboardShortcuts` is enabled:

- **Ctrl+Z**: Undo last action
- **Ctrl+Shift+Z** or **Ctrl+Y**: Redo last action
- **Ctrl+S**: Save signature (if save action is enabled)
- **Escape**: Close settings panel

## CSS Classes

### Theme Classes

```css
/* Default theme */
.react-signature-pad { /* Main container */ }
.signature-canvas-container { /* Canvas wrapper */ }
.signature-canvas { /* Canvas element */ }
.signature-placeholder { /* Empty state */ }

/* Tailwind theme */
.sig-pad-container { /* Enhanced container */ }
.sig-pad-canvas-container { /* Enhanced canvas wrapper */ }
.sig-pad-canvas { /* Enhanced canvas */ }
.sig-pad-placeholder { /* Enhanced empty state */ }
```

### Button Classes

```css
.btn-primary { /* Primary actions (save, done) */ }
.btn-secondary { /* Secondary actions (clear, export) */ }
.btn-tertiary { /* Tertiary actions (settings, help) */ }
.btn-danger { /* Destructive actions (delete, reset) */ }
.btn-ghost { /* Minimal actions (toolbar buttons) */ }

.btn-sm { /* Small size */ }
.btn-md { /* Medium size (default) */ }
.btn-lg { /* Large size */ }
```

### Responsive Classes

```css
/* Mobile optimizations */
@media (max-width: 640px) {
  .sig-pad-container { /* Mobile container styles */ }
  .sig-pad-toolbar { /* Stacked toolbar */ }
  .sig-pad-action-bar { /* Stacked actions */ }
  .sig-pad-settings-panel { /* Full-screen panel */ }
}
```

## Error Handling

The enhanced signature pad includes comprehensive error handling:

```typescript
// Error types
interface SignatureError extends Error {
  code: 'CANVAS_NOT_FOUND' | 'EXPORT_FAILED' | 'SAVE_FAILED' | 'INVALID_OPTIONS';
  context?: any;
}

// Error boundaries
<ErrorBoundary
  fallback={({ error, resetError }) => (
    <div className="error-state">
      <h3>Something went wrong</h3>
      <p>{error.message}</p>
      <button onClick={resetError}>Try again</button>
    </div>
  )}
>
  <EnhancedSignaturePad />
</ErrorBoundary>
```

## Accessibility Features

- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: Full keyboard support for all functionality
- **Screen Reader Support**: Canvas instructions and state announcements
- **High Contrast**: Supports system high contrast mode
- **Focus Management**: Logical tab order and visible focus indicators
- **Reduced Motion**: Respects user's motion preferences

## Performance Considerations

- **Lazy Loading**: Settings panel loads on demand
- **Efficient Re-renders**: Optimized with React.memo and useCallback
- **Canvas Optimization**: Minimized canvas operations for smooth drawing
- **Memory Management**: Proper cleanup of event listeners and timeouts
- **Bundle Size**: Tree-shakeable components reduce bundle size

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Touch Devices**: Full touch and stylus support
- **Accessibility Tools**: NVDA, JAWS, VoiceOver compatibility