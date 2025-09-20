import React from 'react';
import { SignatureOptions } from '../../types';
export interface EnhancedSignaturePadProps {
    canvas?: {
        maxWidth?: number;
        maxHeight?: number;
        placeholder?: React.ReactNode;
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
export declare const EnhancedSignaturePad: React.ForwardRefExoticComponent<EnhancedSignaturePadProps & React.RefAttributes<any>>;
//# sourceMappingURL=EnhancedSignaturePad.d.ts.map