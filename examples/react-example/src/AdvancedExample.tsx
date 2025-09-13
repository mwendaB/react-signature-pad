import React, { useRef } from 'react';
import { SignaturePad } from 'react-signature-pad';

// Advanced usage example for SignaturePad
const AdvancedExample: React.FC = () => {
  const signaturePadRef = useRef<any>(null);

  const handleSave = () => {
    const dataUrl = signaturePadRef.current?.toDataURL('image/png');
    alert('Saved signature!');
    // You can also send dataUrl to a server or download it
  };

  const handleClear = () => {
    signaturePadRef.current?.clear();
  };

  return (
    <div className="panel space-y-4">
      <div>
        <h2 className="heading">Advanced Signature Pad</h2>
        <p className="subtle">Includes controls, customization panel, and actions.</p>
      </div>
      <SignaturePad
        ref={signaturePadRef}
        penColor="#0ea5e9"
        backgroundColor="#f8fafc"
        onEnd={(signature: string) => console.log('Signature data URL:', signature)}
        showControls={true}
        showCustomization={true}
        className="shadow border border-gray-200 rounded-md"
      />
      <div className="flex gap-3 pt-2">
        <button onClick={handleSave} className="button button-primary">Save</button>
        <button onClick={handleClear} className="button button-danger">Clear</button>
      </div>
    </div>
  );
};

export default AdvancedExample;
