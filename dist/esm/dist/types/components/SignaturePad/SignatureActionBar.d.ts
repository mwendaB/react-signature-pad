import React from 'react';
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
export declare const SignatureActionBar: React.FC<SignatureActionBarProps>;
export {};
//# sourceMappingURL=SignatureActionBar.d.ts.map