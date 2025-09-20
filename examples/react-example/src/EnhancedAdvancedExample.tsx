import React, { useState, useRef, useCallback } from 'react';
import { EnhancedSignaturePad } from 'react-signature-pad';

// Advanced Example showcasing all features
const EnhancedAdvancedExample: React.FC = () => {
  const signaturePadRef = useRef<any>(null);
  const [signatures, setSignatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState(true);

  // Simulate API save with error handling
  const handleSave = async (dataUrl: string) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate network delay and potential error
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) {
            reject(new Error('Network error - please try again'));
          } else {
            resolve(dataUrl);
          }
        }, 1500);
      });
      
      setSignatures(prev => [...prev, dataUrl]);
      console.log('Signature saved successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save signature');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = useCallback(async (dataUrl: string) => {
    console.log('Uploading signature:', dataUrl);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Signature uploaded successfully!');
  }, []);

  const handleError = useCallback((error: Error) => {
    console.error('Signature pad error:', error);
    setError(error.message);
  }, []);

  const handleClearAll = () => {
    setSignatures([]);
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Advanced Signature Pad Demo
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Showcasing all features: error handling, loading states, auto-save, 
          keyboard shortcuts, progressive disclosure, and mobile optimization.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200">Error</h4>
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Signature Pad */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
        <EnhancedSignaturePad
          ref={signaturePadRef}
          canvas={{
            maxWidth: 900,
            maxHeight: 400,
            placeholder: (
              <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none select-none">
                <svg className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <p className="text-lg font-semibold mb-2">Create Your Signature</p>
                <p className="text-sm text-gray-400">Use mouse, touch, or stylus to sign</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+Z</kbd>
                  <span>Undo</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+S</kbd>
                  <span>Save</span>
                </div>
              </div>
            )
          }}
          drawing={{
            penColor: '#0ea5e9',
            backgroundColor: '#f8fafc',
            penWidth: 3,
            drawingMode: 'pen',
            minWidth: 0.5,
            maxWidth: 4,
            velocityFilterWeight: 0.7
          }}
          ui={{
            theme: 'tailwind',
            showToolbar: true,
            showActionBar: true,
            showSettings: true,
            compactToolbar: false
          }}
          actions={{
            save: {
              enabled: true,
              text: loading ? 'Saving...' : 'Save Signature',
              callback: handleSave
            },
            upload: {
              enabled: true,
              text: 'Upload to Cloud',
              callback: handleUpload
            },
            clear: {
              enabled: true,
              text: 'Clear Canvas'
            }
          }}
          events={{
            onChange: setIsEmpty,
            onError: handleError,
            onDrawStart: () => console.log('Drawing started'),
            onDrawEnd: () => console.log('Drawing ended')
          }}
          features={{
            enableKeyboardShortcuts: true,
            autoSave: false, // Disabled for this demo
            autoSaveDelay: 2000
          }}
          className="border-2 border-gray-200 dark:border-gray-700 rounded-xl"
        />
      </div>

      {/* Stats and Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Signatures Saved</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{signatures.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <div className={`w-4 h-4 rounded-full ${isEmpty ? 'bg-red-400' : 'bg-green-500'}`} />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">Canvas Status</h3>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                {isEmpty ? 'Empty' : 'Has Content'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">Loading State</h3>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {loading ? 'Processing...' : 'Ready'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Signatures Gallery */}
      {signatures.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Saved Signatures ({signatures.length})
            </h3>
            <button
              onClick={handleClearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {signatures.map((sig, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <img 
                  src={sig} 
                  alt={`Signature ${index + 1}`}
                  className="w-full h-24 object-contain border border-gray-200 dark:border-gray-600 rounded"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">
                    Signature #{index + 1}
                  </span>
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.download = `signature-${index + 1}.png`;
                      link.href = sig;
                      link.click();
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Documentation */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Enhanced Features Demonstrated
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Progressive Disclosure</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Advanced settings hidden by default, revealed on demand</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Error Handling</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive error states with user-friendly messages</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Loading States</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Visual feedback during async operations</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Keyboard Shortcuts</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ctrl+Z (undo), Ctrl+Y (redo), Ctrl+S (save), Esc (close settings)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Mobile Optimized</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Touch-friendly controls and responsive layout</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Enhanced Accessibility</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">ARIA labels, screen reader support, keyboard navigation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdvancedExample;