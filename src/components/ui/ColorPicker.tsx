import React from 'react';
import { cn } from '../../utils/classNames';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  presets?: string[];
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  disabled,
  className,
  presets = ['#000000', '#374151', '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#65A30D', '#16A34A', '#059669', '#0891B2', '#0284C7', '#2563EB', '#7C3AED', '#9333EA', '#C026D3', '#DB2777']
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-3">
        {/* Native color input */}
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={cn(
              'h-10 w-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all duration-200',
              'hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />
          <div className="absolute inset-0 rounded-lg border-2 border-gray-200 dark:border-gray-600 pointer-events-none" />
        </div>

        {/* Color value display */}
        <div className="flex-1">
          <input
            type="text"
            value={value.toUpperCase()}
            onChange={(e) => {
              const color = e.target.value;
              if (/^#[0-9A-F]{6}$/i.test(color)) {
                onChange(color);
              }
            }}
            disabled={disabled}
            placeholder="#000000"
            className={cn(
              'w-full px-3 py-2 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-lg',
              'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />
        </div>
      </div>

      {/* Color presets */}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {presets.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            disabled={disabled}
            className={cn(
              'w-6 h-6 rounded-full border-2 border-gray-200 dark:border-gray-600 cursor-pointer transition-all duration-200',
              'hover:scale-110 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
              value === color && 'ring-2 ring-brand-500 ring-offset-2',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};