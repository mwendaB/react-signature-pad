import React, { useState } from 'react';
import { EnhancedSignaturePad } from 'react-signature-pad';

// Enhanced Basic Example showcasing the new API
const EnhancedBasicExample: React.FC = () => {
  const [signature, setSignature] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSave = async (dataUrl: string) => {
    setSignature(dataUrl);
    console.log('Signature saved:', dataUrl);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Enhanced Basic Signature Pad
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Featuring the new component architecture with improved UX and accessibility
        </p>
      </div>

      {/* Enhanced Signature Pad with New API */}
      <EnhancedSignaturePad
        canvas={{
          maxWidth: 800,
          maxHeight: 300
        }}
        drawing={{
          penColor: '#1f2937',
          backgroundColor: '#ffffff',
          penWidth: 2,
          drawingMode: 'pen'
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
            text: 'Save Signature',
            callback: handleSave
          },
          clear: {
            enabled: true,
            text: 'Clear'
          }
        }}
        events={{
          onChange: setIsEmpty
        }}
        features={{
          enableKeyboardShortcuts: true,
          autoSave: false
        }}
        className="shadow-lg"
      />

      {/* Status Display */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isEmpty ? 'bg-red-400' : 'bg-green-400'}`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status: {isEmpty ? 'Empty' : 'Has Signature'}
            </span>
          </div>
          {signature && (
            <button 
              onClick={() => setSignature('')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Preview
            </button>
          )}
        </div>
        
        {signature && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Saved Signature:
            </p>
            <img 
              src={signature} 
              alt="Saved signature" 
              className="border border-gray-200 dark:border-gray-600 rounded-lg max-w-sm"
            />
          </div>
        )}
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Mobile Optimized</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Touch-first design with responsive controls and mobile-friendly interactions
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Accessible</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Full ARIA support, keyboard navigation, and screen reader compatibility
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Customizable</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Progressive disclosure of advanced settings with intuitive controls
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBasicExample;