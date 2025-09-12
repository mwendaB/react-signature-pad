import React from 'react';
import { SignaturePad } from 'react-signature-pad';

// Basic usage example for SignaturePad
const BasicExample: React.FC = () => {
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Basic Signature Pad Example</h2>
      <SignaturePad
        penColor="#222"
        backgroundColor="#fff"
        onEnd={signature => console.log('Signature data URL:', signature)}
      />
    </div>
  );
};

export default BasicExample;
