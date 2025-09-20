import React from 'react';
import { cn, themeClass } from '../../utils/classNames';
import { Button } from '../ui/Button';

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
  
  // Button customization
  saveText?: string;
  uploadText?: string;
  clearText?: string;
  showSave?: boolean;
  showUpload?: boolean;
  showClear?: boolean;
}

// Icon components
const UndoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
  </svg>
);

const RedoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6-6m6 6l-6 6" />
  </svg>
);

const ClearIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
  </svg>
);

export const SignatureActionBar: React.FC<SignatureActionBarProps> = ({
  onUndo,
  onRedo,
  onClear,
  onSave,
  onUpload,
  canUndo,
  canRedo,
  isEmpty,
  loading = false,
  theme = 'default',
  className,
  saveText = 'Save',
  uploadText = 'Upload',
  clearText = 'Clear',
  showSave = true,
  showUpload = false,
  showClear = true
}) => {
  const containerClasses = cn(
    'flex items-center justify-between gap-4 p-3 rounded-lg border',
    themeClass(
      theme,
      'bg-white border-gray-200',
      'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700'
    ),
    className
  );

  return (
    <div className={containerClasses} role="toolbar" aria-label="Signature actions">
      {/* History Controls */}
      <div className="flex items-center gap-2">
        <Button
          onClick={onUndo}
          disabled={!canUndo}
          variant="ghost"
          size="sm"
          icon={<UndoIcon />}
          aria-label="Undo last action"
          title="Undo (Ctrl+Z)"
        />
        
        <Button
          onClick={onRedo}
          disabled={!canRedo}
          variant="ghost"
          size="sm"
          icon={<RedoIcon />}
          aria-label="Redo last action"
          title="Redo (Ctrl+Y)"
        />
      </div>

      {/* Main Actions */}
      <div className="flex items-center gap-2">
        {showClear && (
          <Button
            onClick={onClear}
            variant="secondary"
            size="sm"
            icon={<ClearIcon />}
            disabled={isEmpty}
            aria-label="Clear signature"
            title="Clear all"
          >
            {clearText}
          </Button>
        )}

        {showSave && onSave && (
          <Button
            onClick={onSave}
            variant="primary"
            size="sm"
            icon={<SaveIcon />}
            disabled={isEmpty}
            loading={loading}
            aria-label="Save signature"
            title="Save signature"
          >
            {saveText}
          </Button>
        )}

        {showUpload && onUpload && (
          <Button
            onClick={onUpload}
            variant="secondary"
            size="sm"
            icon={<UploadIcon />}
            disabled={isEmpty}
            loading={loading}
            aria-label="Upload signature"
            title="Upload signature"
          >
            {uploadText}
          </Button>
        )}
      </div>
    </div>
  );
};