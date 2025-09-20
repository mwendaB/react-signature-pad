import React from 'react';
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    options: Array<{
        value: string;
        label: string;
        disabled?: boolean;
    }>;
    label?: string;
    placeholder?: string;
    error?: string;
}
export declare const Select: React.FC<SelectProps>;
export {};
//# sourceMappingURL=Select.d.ts.map