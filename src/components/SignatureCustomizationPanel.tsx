import React from 'react';
import { SignatureOptions, DrawingMode } from '../types';

interface SignatureCustomizationPanelProps {
  options: Partial<SignatureOptions>;
  onOptionsChange: (options: Partial<SignatureOptions>) => void;
  onClose: () => void;
}

const SignatureCustomizationPanel: React.FC<SignatureCustomizationPanelProps> = ({
  options,
  onOptionsChange,
  onClose
}) => {
  const handleChange = (key: keyof SignatureOptions, value: any) => {
    onOptionsChange({ [key]: value });
  };

  return (
    <div className="signature-customization-panel">
      <div className="panel-header">
        <h3>Customize Signature</h3>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      
      <div className="panel-content">
        <div className="option-group">
          <label>Pen Color</label>
          <input 
            type="color" 
            value={options.penColor || '#000000'} 
            onChange={(e) => handleChange('penColor', e.target.value)}
          />
        </div>
        
        <div className="option-group">
          <label>Pen Width</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={options.penWidth || 2} 
            onChange={(e) => handleChange('penWidth', parseInt(e.target.value))}
          />
          <span>{options.penWidth || 2}px</span>
        </div>
        
        <div className="option-group">
          <label>Background Color</label>
          <input 
            type="color" 
            value={options.backgroundColor || '#ffffff'} 
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
          />
        </div>
        
        <div className="option-group">
          <label>Drawing Mode</label>
          <select 
            value={options.drawingMode || 'pen'} 
            onChange={(e) => handleChange('drawingMode', e.target.value as DrawingMode)}
          >
            <option value="pen">Pen</option>
            <option value="marker">Marker</option>
            <option value="highlighter">Highlighter</option>
          </select>
        </div>
        
        <div className="option-group">
          <label>Min Width</label>
          <input 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.5" 
            value={options.minWidth || 0.5} 
            onChange={(e) => handleChange('minWidth', parseFloat(e.target.value))}
          />
          <span>{options.minWidth || 0.5}px</span>
        </div>
        
        <div className="option-group">
          <label>Max Width</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            step="0.5" 
            value={options.maxWidth || 2.5} 
            onChange={(e) => handleChange('maxWidth', parseFloat(e.target.value))}
          />
          <span>{options.maxWidth || 2.5}px</span>
        </div>
        
        <div className="option-group">
          <label>Velocity Sensitivity</label>
          <input 
            type="range" 
            min="0.1" 
            max="1" 
            step="0.1" 
            value={options.velocityFilterWeight || 0.7} 
            onChange={(e) => handleChange('velocityFilterWeight', parseFloat(e.target.value))}
          />
          <span>{options.velocityFilterWeight || 0.7}</span>
        </div>
      </div>
    </div>
  );
};

export default SignatureCustomizationPanel;