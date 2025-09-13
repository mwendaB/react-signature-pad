import * as React from 'react';
import { SignatureControlsProps } from '../types';
interface EnhancedSignatureControlsProps extends SignatureControlsProps {
    onDownload?: () => void;
    onResetPen?: () => void;
    showGrid?: boolean;
    onToggleGrid?: () => void;
    showEraser?: boolean;
    onEraserMode?: () => void;
    theme?: 'default' | 'tailwind';
}
declare const SignatureControls: React.FC<EnhancedSignatureControlsProps>;
export default SignatureControls;
//# sourceMappingURL=SignatureControls.d.ts.map