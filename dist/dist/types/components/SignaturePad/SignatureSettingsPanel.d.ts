import React from 'react';
import { SignatureOptions } from '../../types';
interface SignatureSettingsPanelProps {
    options: Partial<SignatureOptions>;
    onOptionsChange: (options: Partial<SignatureOptions>) => void;
    onClose: () => void;
    theme?: 'default' | 'tailwind';
    className?: string;
}
export declare const SignatureSettingsPanel: React.FC<SignatureSettingsPanelProps>;
export {};
//# sourceMappingURL=SignatureSettingsPanel.d.ts.map