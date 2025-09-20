import React from 'react';
import { cn, themeClass } from '../../utils/classNames';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { ColorPicker } from '../ui/ColorPicker';
import { Slider } from '../ui/Slider';
import { DrawingMode, SignatureOptions } from '../../types';

interface SignatureToolbarProps {
  currentOptions: SignatureOptions;
  onPenColorChange: (color: string) => void;
  onPenWidthChange: (width: number) => void;
  onDrawingModeChange: (mode: DrawingMode) => void;
  theme?: 'default' | 'tailwind';
  className?: string;
  compact?: boolean;
}

const drawingModeOptions = [
  { value: 'pen', label: 'Pen' },
  { value: 'marker', label: 'Marker' },
  { value: 'highlighter', label: 'Highlighter' }
];

export const SignatureToolbar: React.FC<SignatureToolbarProps> = ({
  currentOptions,
  onPenColorChange,
  onPenWidthChange,
  onDrawingModeChange,
  theme = 'default',
  className,
  compact = false
}) => {
  const containerClasses = cn(
    'flex items-center gap-3 p-3 rounded-lg border',
    themeClass(
      theme,
      'bg-gray-50 border-gray-200',
      'bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-sm border-gray-200 dark:border-gray-700'
    ),
    compact && 'p-2 gap-2',
    className
  );

  return (
    <div className={containerClasses} role="toolbar" aria-label="Drawing tools">
      {/* Drawing Mode */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
          Mode:
        </label>
        <Select
          value={currentOptions.drawingMode}
          onChange={(value) => onDrawingModeChange(value as DrawingMode)}
          options={drawingModeOptions}
          className={cn('min-w-0', compact ? 'w-20' : 'w-24')}
        />
      </div>

      {/* Color Picker */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
          Color:
        </label>
        <div className="relative">
          <input
            type="color"
            value={currentOptions.penColor}
            onChange={(e) => onPenColorChange(e.target.value)}
            className={cn(
              'h-8 w-10 border-2 border-gray-300 dark:border-gray-600 rounded-md overflow-hidden cursor-pointer transition-all duration-200',
              'hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
              themeClass(theme, '', 'sig-pad-color-input')
            )}
            title={`Current color: ${currentOptions.penColor}`}
            aria-label="Pen color"
          />
        </div>
      </div>

      {/* Pen Width */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
          Size:
        </label>
        <div className="flex-1 min-w-0">
          <Slider
            value={currentOptions.penWidth}
            onChange={onPenWidthChange}
            min={1}
            max={10}
            step={1}
            showValue={!compact}
            unit="px"
            variant="brand"
            className="min-w-0"
          />
        </div>
        {compact && (
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono min-w-0">
            {currentOptions.penWidth}px
          </span>
        )}
      </div>

      {/* Pen Preview */}
      <div className="flex items-center">
        <div className="relative flex items-center justify-center w-8 h-8">
          <div
            className="rounded-full border border-gray-200 dark:border-gray-600"
            style={{
              backgroundColor: currentOptions.penColor,
              width: `${Math.max(4, Math.min(currentOptions.penWidth * 2, 16))}px`,
              height: `${Math.max(4, Math.min(currentOptions.penWidth * 2, 16))}px`,
              opacity: currentOptions.drawingMode === 'highlighter' ? 0.5 : 1
            }}
            title={`Preview: ${currentOptions.penWidth}px ${currentOptions.drawingMode}`}
            aria-label="Pen preview"
          />
        </div>
      </div>
    </div>
  );
};