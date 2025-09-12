import React from 'react';
import { SignaturePad } from 'react-signature-pad';

// Basic SignaturePad example for Next.js
const BasicSignaturePage: React.FC = () => {
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Basic Signature Pad Example (Next.js)</h2>
      <SignaturePad
        penColor="#222"
        backgroundColor="#fff"
        onEnd={signature => console.log('Signature data URL:', signature)}
      />
    </div>
  );
};

export default BasicSignaturePage;
