// tailwind.config.js (updated for standard colors)
export default {
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './shared/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
      // Button variants
      'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'text-white', 'hover:bg-blue-700', 'hover:shadow-xl',
      'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'text-gray-900', 'hover:bg-gray-200',
      'border-2', 'border-gray-300', 'text-gray-700', 'hover:bg-gray-50',
      'text-blue-600', 'hover:bg-blue-50', 'hover:text-blue-700',
      'underline-offset-4', 'hover:underline',
      // Card variants
      'bg-white', 'border-gray-200', 'shadow-lg', 'hover:shadow-xl',
      'border-gray-300', 'hover:border-blue-300',
      'bg-transparent', 'border-transparent', 'hover:bg-gray-50',
      'bg-gradient-to-br', 'from-blue-50', 'to-teal-50', 'from-blue-100', 'to-teal-100',
      'cursor-pointer',
      // Tag/Badge/Alert  
      'rounded-full', 'px-2.5', 'py-0.5', 'text-xs', 'font-semibold',
      'bg-green-100', 'bg-blue-100', 'bg-orange-100', 'bg-red-100',
      'text-green-800', 'text-blue-800', 'text-orange-800', 'text-red-800',
      'hover:bg-green-200', 'hover:bg-blue-200', 'hover:bg-orange-200', 'hover:bg-red-200',
      // Colors used in components
      'text-gray-600', 'text-gray-500', 'text-gray-700', 'text-gray-800', 'text-gray-900',
      'bg-gray-50', 'bg-gray-100', 'bg-gray-200',
      'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900',
      'bg-blue-50', 'bg-blue-100', 'bg-blue-600', 'bg-blue-700',
      'text-teal-600', 'text-teal-700', 'text-teal-800', 'text-teal-900',
      'bg-teal-50', 'bg-teal-100', 'bg-teal-600', 'bg-teal-700',
      'text-orange-500', 'text-green-500', 'bg-green-500', 'bg-blue-500', 'bg-orange-500',
      // Gradients
      'from-blue-50', 'to-teal-50', 'from-blue-100', 'to-teal-100',
      'from-blue-200', 'to-teal-200', 'from-blue-300', 'to-teal-300',
      'from-blue-400', 'to-teal-400', 'from-blue-500', 'to-teal-500',
      // Misc
      'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-lg',
      'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl',
      'font-bold', 'font-medium', 'font-semibold',
      'w-full', 'h-full', 'flex', 'items-center', 'justify-center', 'gap-2', 'gap-4',
      'transition-colors', 'transition-all', 'duration-200',
    ],
    theme: {
      extend: {
        colors: {
          // Keep some custom colors for backwards compatibility
          primary: {
            50: '#EBF1F8',
            100: '#D6E3F1', 
            200: '#ADC7E3',
            300: '#84ABD5',
            400: '#5B8FC7',
            500: '#26547C',
            600: '#1E4362',
            700: '#163249',
            800: '#0E2131',
            900: '#071118',
          },
          secondary: {
            50: '#FFF3F1',
            100: '#FFE7E3',
            200: '#FFCFC7',
            300: '#FFB7AB',
            400: '#FF9F8F',
            500: '#FF715B',
            600: '#FF4C2C',
            700: '#E6330F',
            800: '#B8280C',
            900: '#8A1E09',
          },
          graphite: {
            50: '#F5F5F5',
            100: '#E5E5E5',
            200: '#CCCCCC',
            300: '#B3B3B3',
            400: '#999999',
            500: '#333333',
            600: '#2E2E2E',
            700: '#292929',
            800: '#1F1F1F',
            900: '#141414',
          },
          // Standard colors will be available by default
          background: 'var(--background)',
          foreground: 'var(--foreground)',
        },
        fontFamily: {
          inter: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        },
        fontSize: {
          'xs': ['0.75rem', { lineHeight: '1rem' }],
          'sm': ['0.875rem', { lineHeight: '1.25rem' }],
          'base': ['1rem', { lineHeight: '1.5rem' }],
          'lg': ['1.125rem', { lineHeight: '1.75rem' }],
          'xl': ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1' }],
          '6xl': ['3.75rem', { lineHeight: '1' }],
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
          '128': '32rem',
        },
        boxShadow: {
          'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        borderRadius: {
          'xl': '0.75rem',
          '2xl': '1rem',
          '3xl': '1.5rem',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.5s ease-out',
          'slide-down': 'slideDown 0.5s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }