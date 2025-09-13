import type { AppProps } from 'next/app';
import '../styles/globals.css';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="sig-container">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">React Signature Pad (Next.js)</h1>
          <p className="text-sm text-gray-500">Framework integration example.</p>
        </div>
        <button
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="button"
        >
          Toggle Dark
        </button>
      </header>
      <main className="space-y-10 mt-6">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
