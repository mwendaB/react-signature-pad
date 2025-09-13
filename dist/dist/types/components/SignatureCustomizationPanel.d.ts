import React from 'react';
import { SignatureOptions } from '../types';
interface SignatureCustomizationPanelProps {
    options: Partial<SignatureOptions>;
    onOptionsChange: (options: Partial<SignatureOptions>) => void;
    onClose: () => void;
}
declare const SignatureCustomizationPanel: React.FC<SignatureCustomizationPanelProps>;
export default SignatureCustomizationPanel;
//# sourceMappingURL=SignatureCustomizationPanel.d.ts.map