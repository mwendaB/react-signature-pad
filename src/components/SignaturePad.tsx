import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { SignaturePadProps, SignaturePadHandle } from '../types';
import { EnhancedSignaturePad, EnhancedSignaturePadProps } from './SignaturePad/EnhancedSignaturePad';

// Enhanced version with backward compatibility wrapper
const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>((props, ref) => {
  // We will attempt to capture internal imperative functions via a ref to the enhanced component if it exposes them later.
  const internalRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    clear: () => internalRef.current?.canvas?.clear?.() || internalRef.current?.clear?.(),
    undo: () => internalRef.current?.history?.undo?.(),
    redo: () => internalRef.current?.history?.redo?.(),
    toDataURL: (type?: string, quality?: number) => internalRef.current?.export?.toDataURL?.(type, quality) || '',
    toSVG: () => internalRef.current?.export?.exportAsSVG?.() || internalRef.current?.exportAsSVG?.() || '',
    getStrokes: () => internalRef.current?.getStrokes?.() || [],
    loadStrokes: (s) => internalRef.current?.loadStrokes?.(s)
  }), []);
  // If using new enhanced API pattern, delegate to EnhancedSignaturePad
  if ('canvas' in props || 'drawing' in props || 'ui' in props || 'actions' in props) {
  return <EnhancedSignaturePad ref={internalRef} {...props as any} />;
  }

  // Legacy API support - convert old props to new format
  const {
    onSave,
    onUpload,
    onClear,
    onChange,
    options = {},
    className = '',
    showControls = true,
    showCustomization = true,
    uploadButton = false,
    uploadText = "Upload Signature",
    saveButton = true,
    saveText = "Save Signature",
    clearButton = true,
    clearText = "Clear",
    maxWidth = 800,
    maxHeight = 300,
    theme = 'default',
    showDarkModeToggle = false,
  } = props;

  // Convert legacy props to new enhanced API format
  const enhancedProps: EnhancedSignaturePadProps = {
    className,
    canvas: {
      maxWidth,
      maxHeight
    },
    drawing: options,
    ui: {
      theme,
      showToolbar: showControls,
      showActionBar: showControls,
      showSettings: showCustomization
    },
    actions: {
      save: {
        enabled: saveButton,
        text: saveText,
        callback: onSave
      },
      upload: {
        enabled: uploadButton,
        text: uploadText,
        callback: onUpload
      },
      clear: {
        enabled: clearButton,
        text: clearText,
        callback: onClear
      }
    },
    events: {
      onChange
    },
    features: {
      enableKeyboardShortcuts: true
    }
  };

  return <EnhancedSignaturePad ref={internalRef} {...enhancedProps} />;
});

export default SignaturePad;