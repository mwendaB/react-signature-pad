import React from 'react';

const TestPage: React.FC = () => {
  console.log('TestPage rendering...');
  console.log('React:', React);
  console.log('React.useRef:', React.useRef);
  
  const testRef = React.useRef(null);
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>React Test Page</h1>
      <p>Testing React hooks and imports...</p>
      <div ref={testRef}>Test ref element</div>
      
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <h3>Debug Info:</h3>
        <p>React version: {React.version || 'unknown'}</p>
        <p>useRef available: {React.useRef ? 'Yes' : 'No'}</p>
        <p>testRef current: {testRef.current ? 'Has element' : 'null'}</p>
      </div>
    </div>
  );
};

export default TestPage;