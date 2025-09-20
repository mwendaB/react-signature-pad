import React, { useState } from 'react';
import { cn, themeClass } from '../../utils/classNames';
import { Button } from '../ui/Button';
import { ColorPicker } from '../ui/ColorPicker';
import { Slider } from '../ui/Slider';
import { Select } from '../ui/Select';
import { DrawingMode, SignatureOptions } from '../../types';

interface SignatureSettingsPanelProps {
  options: Partial<SignatureOptions>;
  onOptionsChange: (options: Partial<SignatureOptions>) => void;
  onClose: () => void;
  theme?: 'default' | 'tailwind';
  className?: string;
}

const drawingModeOptions = [
  { value: 'pen', label: 'Pen - Smooth, variable width' },
  { value: 'marker', label: 'Marker - Consistent width' },
  { value: 'highlighter', label: 'Highlighter - Semi-transparent' }
];

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg className={cn('w-4 h-4 transition-transform duration-200', isOpen && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const SignatureSettingsPanel: React.FC<SignatureSettingsPanelProps> = ({
  options,
  onOptionsChange,
  onClose,
  theme = 'default',
  className
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (key: keyof SignatureOptions, value: any) => {
    onOptionsChange({ [key]: value });
  };

  const handleReset = () => {
    onOptionsChange({
      penColor: '#000000',
      penWidth: 2,
      backgroundColor: '#ffffff',
      drawingMode: 'pen',
      minWidth: 0.5,
      maxWidth: 2.5,
      velocityFilterWeight: 0.7
    });
  };

  const panelClasses = cn(
    'w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-6',
    themeClass(theme, '', 'backdrop-blur-sm bg-white/95 dark:bg-gray-900/95'),
    className
  );

  return (
    <div className={panelClasses}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SettingsIcon />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Signature Settings
          </h3>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          icon={<CloseIcon />}
          aria-label="Close settings"
        />
      </div>

      <div className="space-y-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            Basic Settings
          </h4>

          <div className="space-y-4">
            <Select
              label="Drawing Mode"
              value={options.drawingMode || 'pen'}
              onChange={(value) => handleChange('drawingMode', value as DrawingMode)}
              options={drawingModeOptions}
            />

            <ColorPicker
              label="Pen Color"
              value={options.penColor || '#000000'}
              onChange={(color) => handleChange('penColor', color)}
            />

            <Slider
              label="Pen Width"
              value={options.penWidth || 2}
              onChange={(width) => handleChange('penWidth', width)}
              min={1}
              max={10}
              step={1}
              unit="px"
              variant="brand"
            />

            <ColorPicker
              label="Background Color"
              value={options.backgroundColor || '#ffffff'}
              onChange={(color) => handleChange('backgroundColor', color)}
            />
          </div>
        </div>

        {/* Advanced Settings (Collapsible) */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <span className="uppercase tracking-wide">Advanced Settings</span>
            <ChevronDownIcon isOpen={showAdvanced} />
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
              <Slider
                label="Minimum Width"
                value={options.minWidth || 0.5}
                onChange={(width) => handleChange('minWidth', width)}
                min={0.1}
                max={5}
                step={0.1}
                unit="px"
                variant="brand"
              />

              <Slider
                label="Maximum Width"
                value={options.maxWidth || 2.5}
                onChange={(width) => handleChange('maxWidth', width)}
                min={1}
                max={10}
                step={0.1}
                unit="px"
                variant="brand"
              />

              <Slider
                label="Velocity Sensitivity"
                value={options.velocityFilterWeight || 0.7}
                onChange={(weight) => handleChange('velocityFilterWeight', weight)}
                min={0.1}
                max={1}
                step={0.1}
                variant="brand"
              />

              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <strong>Velocity Sensitivity:</strong> Controls how pen speed affects line thickness. 
                Higher values make faster strokes thinner.
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
          >
            Reset to Default
          </Button>
          
          <Button
            onClick={onClose}
            variant="primary"
            size="sm"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};