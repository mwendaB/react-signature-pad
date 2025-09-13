export { default as SignaturePad } from './components/SignaturePad';
export { useSignature } from './hooks/useSignature';
export { useUndoRedo } from './hooks/useUndoRedo';
export * from './types';
export * from './utils/exportUtils';
export * from './utils/validationUtils';

// No default export to encourage named imports and avoid mixed export warnings.