import React from 'react';
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
export declare const Slider: React.FC<SliderProps>;
export {};
//# sourceMappingURL=Slider.d.ts.map