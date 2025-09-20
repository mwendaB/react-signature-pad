import React from 'react';
import { SignaturePadProps } from '../../types';
import { EnhancedSignaturePad, EnhancedSignaturePadProps } from './EnhancedSignaturePad';

// Enhanced version with backward compatibility wrapper
const SignaturePad: React.FC<SignaturePadProps> = (props) => {
  // If using new enhanced API pattern, delegate to EnhancedSignaturePad
  if ('canvas' in props || 'drawing' in props || 'ui' in props || 'actions' in props) {
    return <EnhancedSignaturePad {...props as any} />;
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

  return <EnhancedSignaturePad {...enhancedProps} />;
};

export default SignaturePad;