import React from 'react';
import { TestSignaturePad } from './test-simple';

// Try to import from the package
let SignaturePadComponent: any = null;
let importError: string | null = null;

try {
  const pkg = require('react-signature-pad');
  console.log('Package imported successfully:', Object.keys(pkg));
  SignaturePadComponent = pkg.SignaturePad;
} catch (error) {
  console.error('Package import error:', error);
  importError = error instanceof Error ? error.message : 'Unknown import error';
}

const DebugPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Debug Page - Import Testing</h1>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <h2>Import Status</h2>
        {importError ? (
          <div style={{ color: 'red' }}>
            <p><strong>Import Error:</strong> {importError}</p>
          </div>
        ) : (
          <div style={{ color: 'green' }}>
            <p><strong>Package imported successfully!</strong></p>
            <p>SignaturePad component: {SignaturePadComponent ? 'Found' : 'Not found'}</p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Simple Test Component (Local)</h2>
        <TestSignaturePad />
      </div>

      {SignaturePadComponent && (
        <div>
          <h2>Package Component Test</h2>
          <div style={{ border: '2px solid #007bff', padding: '1rem', borderRadius: '8px' }}>
            <SignaturePadComponent 
              options={{ penColor: '#007bff', penWidth: 2 }}
              maxWidth={400}
              maxHeight={200}
              showControls={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugPage;