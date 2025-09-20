import React from 'react';
import { cn } from '../../utils/classNames';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  unit?: string;
  variant?: 'default' | 'brand';
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  unit = '',
  variant = 'default',
  className,
  disabled,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {showValue && (
            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {value}{unit}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className={cn(
          'w-full h-2 rounded-lg appearance-none cursor-pointer transition-all duration-200',
          'bg-gray-200 dark:bg-gray-700',
          variant === 'brand' && 'accent-brand-600',
          variant === 'default' && 'accent-gray-600',
          'hover:bg-gray-300 dark:hover:bg-gray-600',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
          disabled && 'opacity-50 cursor-not-allowed',
          // Webkit slider thumb styles
          '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:bg-brand-700 [&::-webkit-slider-thumb]:transition-colors',
          // Firefox slider thumb styles  
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-lg'
        )}
        {...props}
      />
    </div>
  );
};