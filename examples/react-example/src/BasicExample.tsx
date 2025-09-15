import React from 'react';
import { SignaturePad } from 'react-signature-pad';

// Basic usage for SignaturePad
const BasicExample: React.FC = () => {
  return (
    <div className="panel space-y-4">
      <div>
        <h2 className="heading">Basic Signature Pad</h2>
        <p className="subtle">A lightweight default configuration.</p>
      </div>
      <div className="signature-wrapper">
        <SignaturePad
          penColor="#1f2937"
          backgroundColor="#ffffff"
          onEnd={(signature: string) => console.log('Signature data URL:', signature)}
          className="shadow border border-gray-200 rounded-md"
        />
      </div>
    </div>
  );
};

export default BasicExample;
