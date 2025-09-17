/**
 * Utility function for combining class names
 * Simple alternative to clsx for combining conditional classes
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Creates a conditional class name based on a condition
 */
export function conditionalClass(condition: boolean, trueClass: string, falseClass = '') {
  return condition ? trueClass : falseClass;
}

/**
 * Merges theme-specific classes
 */
export function themeClass(theme: 'default' | 'tailwind', defaultClass: string, tailwindClass: string) {
  return theme === 'tailwind' ? tailwindClass : defaultClass;
}