import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import BasicExample from './BasicExample';
import AdvancedExample from './AdvancedExample';

const App: React.FC = () => {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">React Signature Pad Examples</h1>
            <p className="text-sm text-gray-500 mt-1">Basic and advanced usage with live customization.</p>
          </div>
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="button"
          >
            Toggle Dark
          </button>
        </header>
        <div className="grid gap-10">
      <section style={{ borderTop: '1px solid #ccc', paddingTop: '1rem', marginTop: '1rem' }}>
        <BasicExample />
      </section>
      <section style={{ borderTop: '1px solid #ccc', paddingTop: '1rem', marginTop: '1rem' }}>
        <AdvancedExample />
      </section>
        </div>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
