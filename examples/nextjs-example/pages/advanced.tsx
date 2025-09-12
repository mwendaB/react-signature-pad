import React, { useRef } from 'react';
import { SignaturePad } from 'react-signature-pad';

// Advanced SignaturePad example for Next.js
const AdvancedSignaturePage: React.FC = () => {
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
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Advanced Signature Pad Example (Next.js)</h2>
      <SignaturePad
        ref={signaturePadRef}
        penColor="#007bff"
        backgroundColor="#f8f9fa"
        onEnd={signature => console.log('Signature data URL:', signature)}
        showControls={true}
        showCustomization={true}
      />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSave}>Save Signature</button>
        <button onClick={handleClear} style={{ marginLeft: '1rem' }}>Clear</button>
      </div>
    </div>
  );
};

export default AdvancedSignaturePage;
