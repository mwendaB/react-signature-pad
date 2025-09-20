/**
 * Utility function for combining class names
 * Simple alternative to clsx for combining conditional classes
 */
export declare function cn(...inputs: (string | undefined | null | boolean)[]): string;
/**
 * Creates a conditional class name based on a condition
 */
export declare function conditionalClass(condition: boolean, trueClass: string, falseClass?: string): string;
/**
 * Merges theme-specific classes
 */
export declare function themeClass(theme: 'default' | 'tailwind', defaultClass: string, tailwindClass: string): string;
//# sourceMappingURL=classNames.d.ts.map