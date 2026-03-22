/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'jio-purple': '#635BFF',
        'jio-navy': '#0F172A',
        'jio-navy-light': '#1E293B',
        'jio-amber': '#F59E0B',
        'jio-teal': '#10B981',
        'jio-blue': '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'counter-fade-in': 'counterFadeIn 0.8s ease-in-out forwards',
      },
      keyframes: {
        counterFadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}

