module.exports = {
  darkMode: 'class',
  content: [
    './src/components/SignaturePad.tsx',
    './src/components/SignatureControls.tsx'
  ],
  safelist: [
    // Enhanced design classes
    'rounded-2xl','rounded-xl','rounded-lg','rounded-full','border','border-2','border-gray-100','border-gray-200','border-gray-300','border-gray-600','border-gray-700',
    'shadow-sm','shadow-md','shadow-lg','shadow-xl','shadow-inner','shadow-brand-200/50','shadow-red-200/50','shadow-gray-200/50','shadow-gray-200/80','shadow-gray-900/50','shadow-gray-900/80',
    'dark:shadow-brand-900/50','dark:shadow-red-900/50','dark:shadow-gray-900/50','dark:shadow-gray-900/80',
    'bg-white','bg-white/80','bg-white/90','bg-gray-50','bg-gray-50/50','bg-gray-100','bg-gray-700','bg-gray-800','bg-gray-800/30','bg-gray-800/80','bg-gray-800/90','bg-gray-900',
    'dark:bg-gray-800','dark:bg-gray-800/30','dark:bg-gray-800/80','dark:bg-gray-800/90','dark:bg-gray-900',
    'bg-gradient-to-br','from-white','via-gray-50','to-white','dark:from-gray-900','dark:via-gray-800','dark:to-gray-900',
    'bg-brand-50','bg-brand-600','bg-brand-700','bg-red-600','bg-red-700','dark:bg-brand-900/20',
    // Text & color utilities  
    'text-xs','text-sm','text-base','text-white','text-gray-300','text-gray-400','text-gray-500','text-gray-700','text-brand-300','text-brand-700',
    'dark:text-gray-200','dark:text-gray-500','dark:text-gray-600','dark:text-brand-300',
    // Layout & spacing
    'p-2','p-3','p-6','px-3','py-2','mt-6','mb-1','mb-3','h-2','h-10','h-12','w-12','z-50',
    // Flex & alignment
    'inline-flex','flex','flex-col','items-center','justify-center','gap-2',
    // Ring, focus & backdrop
    'ring-1','ring-2','ring-gray-100','ring-gray-700','ring-brand-200','ring-brand-500/20','dark:ring-gray-700','dark:ring-brand-700',
    'backdrop-blur-sm','overflow-hidden',
    'focus:ring-2','focus:ring-brand-500/20','focus:border-brand-500',
    // Borders & hovers
    'border-brand-200','border-brand-300','border-brand-500','border-brand-600','border-brand-700','border-red-600','border-red-700',
    'hover:bg-gray-100','hover:bg-gray-200','hover:bg-brand-50','hover:bg-brand-700','hover:bg-red-700',
    'hover:border-brand-200','hover:border-brand-300','hover:border-brand-600','hover:border-brand-700','hover:border-red-700',
    'hover:text-brand-700','hover:text-white','hover:shadow-md','hover:shadow-xl','hover:ring-brand-200',
    'dark:hover:bg-gray-600','dark:hover:bg-gray-700','dark:hover:bg-brand-900/20','dark:hover:border-brand-600','dark:hover:border-brand-700','dark:hover:text-brand-300','dark:hover:ring-brand-700',
    // Transitions & animations
    'transition','transition-all','duration-200','duration-300','ease-out','animate-pulse',
    'hover:scale-105','hover:scale-110','active:scale-95','transform',
    // State classes
    'disabled:opacity-40','disabled:cursor-not-allowed','cursor-pointer','pointer-events-none','select-none',
    // Position & utilities
    'absolute','relative','fixed','inset-0','top-4','right-4','accent-brand-600','font-medium'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a'
        }
      },
      backdropBlur: {
        'sm': '4px'
      }
    }
  },
  plugins: []
};
