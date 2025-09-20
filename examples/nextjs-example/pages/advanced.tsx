import React, { useState } from 'react';
import { SignaturePad, EnhancedSignaturePad } from 'react-signature-pad';
import 'react-signature-pad/dist/styles/tailwind.css';

// Advanced SignaturePad example for Next.js
const AdvancedSignaturePage: React.FC = () => {
  const [signature, setSignature] = useState<string | null>(null);
  const [useEnhanced, setUseEnhanced] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');

  const handleSave = async (dataURL: string) => {
    setSignature(dataURL);
    setLastAction('Signature saved successfully!');
    console.log('Signature saved:', dataURL);
  };

  const handleUpload = async (dataURL: string) => {
    // Simulate upload
    setLastAction('Signature uploaded to server!');
    console.log('Signature uploaded:', dataURL);
  };

  const handleClear = () => {
    setSignature(null);
    setLastAction('Canvas cleared');
  };

  const handleError = (error: Error) => {
    setLastAction(`Error: ${error.message}`);
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Advanced Signature Pad Example (Next.js)</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Compare the legacy component with the new enhanced version.
        </p>
        
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setUseEnhanced(false)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: !useEnhanced ? '#007bff' : '#f8f9fa',
              color: !useEnhanced ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Legacy Component
          </button>
          <button
            onClick={() => setUseEnhanced(true)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: useEnhanced ? '#007bff' : '#f8f9fa',
              color: useEnhanced ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Enhanced Component (v2.0)
          </button>
        </div>

        {lastAction && (
          <div style={{
            padding: '0.75rem',
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {lastAction}
          </div>
        )}
      </div>

      {!useEnhanced ? (
        <SignaturePad
          onSave={handleSave}
          onUpload={handleUpload}
          onClear={handleClear}
          onChange={(isEmpty: boolean) => console.log('Canvas empty:', isEmpty)}
          options={{
            penColor: '#007bff',
            penWidth: 2,
            backgroundColor: '#f8f9fa'
          }}
          showControls={true}
          showCustomization={true}
          uploadButton={true}
          uploadText="📤 Upload"
          saveButton={true}
          saveText="💾 Save"
          clearButton={true}
          clearText="🗑️ Clear"
          maxWidth={600}
          maxHeight={250}
          theme="tailwind"
        />
      ) : (
        <EnhancedSignaturePad
          className=""
          canvas={{ 
            maxWidth: 600, 
            maxHeight: 250,
            placeholder: (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#999'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✍️</div>
                <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>Enhanced Signature Pad</p>
                <p style={{ fontSize: '0.75rem' }}>Try keyboard shortcuts: Ctrl+Z, Ctrl+S</p>
              </div>
            )
          }}
          drawing={{
            penColor: '#007bff',
            penWidth: 2,
            backgroundColor: '#f8f9fa',
            drawingMode: 'pen'
          }}
          ui={{
            theme: 'tailwind',
            showToolbar: true,
            showActionBar: true,
            showSettings: true
          }}
          actions={{
            save: { 
              enabled: true,
              text: '💾 Save',
              callback: handleSave 
            },
            upload: { 
              enabled: true,
              text: '📤 Upload',
              callback: handleUpload 
            }
          }}
          events={{
            onChange: (isEmpty: boolean) => console.log('Canvas empty:', isEmpty),
            onError: handleError,
            onDrawStart: () => setLastAction('Started drawing...'),
            onDrawEnd: () => setLastAction('Drawing completed')
          }}
          features={{
            enableKeyboardShortcuts: true,
            maxHistorySize: 50
          }}
        />
      )}

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
              height: 'auto',
              marginBottom: '1rem'
            }} 
          />
          <div>
            <a
              href={signature}
              download="signature.png"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                marginRight: '0.5rem'
              }}
            >
              Download PNG
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(signature);
                setLastAction('Signature copied to clipboard!');
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Copy Data URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSignaturePage;
