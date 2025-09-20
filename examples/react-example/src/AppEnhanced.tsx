import { useState } from 'react';
import { EnhancedSignaturePad, SignaturePad } from '../../../src';
import '../../../src/styles/tailwind.css';

export default function App() {
  const [activeExample, setActiveExample] = useState<'enhanced' | 'legacy'>('enhanced');
  const [signature, setSignature] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string>('');

  const handleSave = async (dataUrl: string) => {
    setSignature(dataUrl);
    setLastAction('Signature saved!');
    console.log('Signature saved:', dataUrl);
  };

  const handleUpload = async (dataUrl: string) => {
    // Simulate upload
    setLastAction('Signature uploaded!');
    console.log('Signature uploaded:', dataUrl);
  };

  const handleClear = () => {
    setSignature(null);
    setLastAction('Canvas cleared!');
  };

  const handleChange = (isEmpty: boolean) => {
    if (isEmpty && signature) {
      setSignature(null);
    }
  };

  const handleError = (error: Error) => {
    setLastAction(`Error: ${error.message}`);
    console.error('Signature pad error:', error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            React Signature Pad v2.0
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Enhanced UX, improved accessibility, and better developer experience
          </p>
          
          {/* Example Toggle */}
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveExample('enhanced')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeExample === 'enhanced'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Enhanced Component
            </button>
            <button
              onClick={() => setActiveExample('legacy')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeExample === 'legacy'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Legacy Component
            </button>
          </div>
        </div>

        {/* Status Display */}
        {lastAction && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-medium">{lastAction}</p>
            </div>
          </div>
        )}

        {/* Example Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <h2 className="text-2xl font-bold">
                {activeExample === 'enhanced' ? 'Enhanced Signature Pad' : 'Legacy Signature Pad'}
              </h2>
              <p className="text-blue-100 mt-2">
                {activeExample === 'enhanced' 
                  ? 'New v2.0 component with improved UX and features'
                  : 'Original v1.x component for backward compatibility'
                }
              </p>
            </div>
            
            <div className="p-8">
              {activeExample === 'enhanced' ? (
                <EnhancedSignaturePad
                  canvas={{ 
                    maxWidth: 800, 
                    maxHeight: 300,
                    placeholder: (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium">Sign here</p>
                        <p className="text-xs">Use mouse, touch, or stylus</p>
                      </div>
                    )
                  }}
                  drawing={{ 
                    penColor: '#2563eb', 
                    penWidth: 2,
                    backgroundColor: '#ffffff',
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
                      text: '💾 Save',
                      callback: handleSave 
                    },
                    upload: { 
                      enabled: true,
                      text: '☁️ Upload',
                      callback: handleUpload 
                    },
                    clear: { 
                      enabled: true,
                      text: '🗑️ Clear'
                    }
                  }}
                  events={{
                    onChange: handleChange,
                    onError: handleError,
                    onDrawStart: () => setLastAction('Started drawing...'),
                    onDrawEnd: () => setLastAction('Finished drawing')
                  }}
                  features={{
                    autoSave: false,
                    enableKeyboardShortcuts: true,
                    maxHistorySize: 50
                  }}
                />
              ) : (
                <SignaturePad
                  onSave={handleSave}
                  onUpload={handleUpload}
                  onClear={handleClear}
                  onChange={handleChange}
                  options={{
                    penColor: '#2563eb',
                    penWidth: 2,
                    backgroundColor: '#ffffff'
                  }}
                  showControls={true}
                  showCustomization={true}
                  uploadButton={true}
                  uploadText="☁️ Upload"
                  saveButton={true}
                  saveText="💾 Save"
                  clearButton={true}
                  clearText="🗑️ Clear"
                  maxWidth={800}
                  maxHeight={300}
                  theme="tailwind"
                />
              )}
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-50 p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Feature Comparison</h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-600 mb-3">✨ Enhanced Component (v2.0)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Progressive disclosure UI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Keyboard shortcuts (Ctrl+Z, Ctrl+S)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Enhanced accessibility (ARIA labels)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Mobile-first responsive design
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Error boundaries & loading states
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Auto-save capability
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Grouped, intuitive prop API
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">🔄 Legacy Component (v1.x)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Backward compatibility
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Original flat prop structure
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Basic drawing functionality
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Simple customization panel
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Standard responsive behavior
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Basic error handling
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Compatible with existing code
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Preview */}
        {signature && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gray-50 p-6 border-b">
                <h3 className="text-xl font-bold text-gray-800">Saved Signature</h3>
              </div>
              <div className="p-6 text-center">
                <img 
                  src={signature} 
                  alt="Saved signature" 
                  className="max-w-full h-auto mx-auto border rounded-lg shadow-sm"
                  style={{ maxHeight: '200px' }}
                />
                <div className="mt-4 flex justify-center gap-4">
                  <a
                    href={signature}
                    download="signature.png"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Download PNG
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(signature);
                      setLastAction('Signature copied to clipboard!');
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Copy Data URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            React Signature Pad v2.0.0 - Enhanced UX and Developer Experience
          </p>
          <div className="mt-2 space-x-4">
            <a 
              href="https://github.com/MwendaB/react-signature-pad" 
              className="text-blue-500 hover:text-blue-600 underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
            <a 
              href="https://www.npmjs.com/package/react-signature-pad" 
              className="text-blue-500 hover:text-blue-600 underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              NPM Package
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}