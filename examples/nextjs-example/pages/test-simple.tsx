import React from 'react';

// Simple test component to verify React imports work
export const TestSignaturePad: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isEmpty, setIsEmpty] = React.useState(true);

  console.log('TestSignaturePad - React:', React);
  console.log('TestSignaturePad - useRef:', React.useRef);
  console.log('TestSignaturePad - canvasRef:', canvasRef);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsEmpty(true);
      }
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>Test Signature Pad</h3>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: '1px solid #ddd', display: 'block', margin: '1rem 0' }}
        onMouseDown={() => setIsEmpty(false)}
      />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleClear} style={{ marginRight: '1rem' }}>
          Clear
        </button>
        <span>Canvas empty: {isEmpty ? 'Yes' : 'No'}</span>
      </div>
    </div>
  );
};