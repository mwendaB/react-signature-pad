import React, { useState } from 'react';
import { SignaturePad } from '../../../src';
import '../../../dist/tailwind.css';

function App() {
  const [signature, setSignature] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSave = (dataURL: string) => {
    setSignature(dataURL);
    console.log('Signature saved:', dataURL);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 bg-gradient-to-r ${
            isDarkMode 
              ? 'from-blue-400 to-purple-400 text-transparent bg-clip-text'
              : 'from-blue-600 to-purple-600 text-transparent bg-clip-text'
          }`}>
            Beautiful Signature Pad
          </h1>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-2xl mx-auto`}>
            Experience our elegant, feature-rich signature component with beautiful animations and dark mode support
          </p>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg shadow-yellow-500/25'
                : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg shadow-purple-500/25'
            } hover:shadow-xl`}
          >
            {isDarkMode ? '☀️' : '🌙'}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Signature Pad */}
        <div className="max-w-4xl mx-auto">
          <SignaturePad
            options={{ width: 800, height: 400 }}
            onSave={handleSave}
            saveText="💾 Save Signature"
            clearText="🗑️ Clear"
            theme="tailwind"
            showDarkModeToggle={false}
            showControls={true}
            saveButton={true}
            className="mx-auto"
          />
        </div>

        {/* Saved Signature Display */}
        {signature && (
          <div className="max-w-2xl mx-auto mt-12">
            <div className={`p-8 rounded-2xl border-2 border-dashed transition-all duration-300 ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-800/50 backdrop-blur-sm'
                : 'border-gray-300 bg-white/50 backdrop-blur-sm'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                ✨ Your Beautiful Signature
              </h3>
              <div className="flex justify-center">
                <img 
                  src={signature} 
                  alt="Saved signature" 
                  className="max-w-full h-auto rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700"
                />
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setSignature(null)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  } transform hover:scale-105`}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            ✨ Amazing Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Beautiful Design',
                description: 'Modern, elegant interface with smooth animations and gradients'
              },
              {
                icon: '🌙',
                title: 'Dark Mode',
                description: 'Seamless dark mode support with automatic theme detection'
              },
              {
                icon: '📱',
                title: 'Responsive',
                description: 'Works perfectly on desktop, tablet, and mobile devices'
              },
              {
                icon: '⚡',
                title: 'Fast & Smooth',
                description: 'Optimized performance with buttery smooth drawing experience'
              },
              {
                icon: '🎯',
                title: 'Accessible',
                description: 'Full keyboard navigation and screen reader support'
              },
              {
                icon: '🔧',
                title: 'Customizable',
                description: 'Extensive customization options and theming support'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                    : 'bg-white/50 border-gray-200 hover:bg-white/70'
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;