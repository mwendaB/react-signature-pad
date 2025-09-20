import React, { useState } from 'react';
import { SignaturePad } from 'react-signature-pad';
import 'react-signature-pad/dist/styles/tailwind.css';

// Basic SignaturePad example for Next.js
const BasicSignaturePage: React.FC = () => {
  const [signature, setSignature] = useState<string | null>(null);

  const handleSave = (dataURL: string) => {
    setSignature(dataURL);
    console.log('Signature saved:', dataURL);
  };

  const handleClear = () => {
    setSignature(null);
    console.log('Signature cleared');
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Basic Signature Pad Example (Next.js)</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Sign below using mouse, touch, or stylus
      </p>
      
      <SignaturePad
        onSave={handleSave}
        onClear={handleClear}
        onChange={(isEmpty) => console.log('Canvas empty:', isEmpty)}
        options={{
          penColor: '#222',
          penWidth: 2,
          backgroundColor: '#fff'
        }}
        showControls={true}
        saveButton={true}
        saveText="Save Signature"
        clearButton={true}
        clearText="Clear"
        maxWidth={500}
        maxHeight={200}
        theme="tailwind"
      />

      {signature && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Saved Signature:</h3>
          <img 
            src={signature} 
            alt="Saved signature" 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              maxWidth: '100%',
              height: 'auto'
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default BasicSignaturePage;
