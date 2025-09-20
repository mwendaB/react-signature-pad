export { default as SignaturePad } from './components/SignaturePad';
export { EnhancedSignaturePad } from './components/SignaturePad/EnhancedSignaturePad';
export { SignatureCanvas } from './components/SignaturePad/SignatureCanvas';
export { SignatureToolbar } from './components/SignaturePad/SignatureToolbar';
export { SignatureActionBar } from './components/SignaturePad/SignatureActionBar';
export { SignatureSettingsPanel } from './components/SignaturePad/SignatureSettingsPanel';

// UI Components
export { Button } from './components/ui/Button';
export { ColorPicker } from './components/ui/ColorPicker';
export { Slider } from './components/ui/Slider';
export { Select } from './components/ui/Select';

// Hooks
export { useSignature } from './hooks/useSignature';
export { useSignaturePad } from './hooks/useSignaturePad';
export { useUndoRedo } from './hooks/useUndoRedo';

// Types
export * from './types';
// Explicit re-export for common handle type import path clarity
export type { SignaturePadHandle } from './types';

// Utils
export * from './utils/exportUtils';
export * from './utils/validationUtils';
export * from './utils/classNames';

// No default export to encourage named imports and avoid mixed export warnings.