/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          deepest: '#17060D',
          deep: '#380817',
          DEFAULT: '#380817',
          wine: '#64152D',
        },
        rose: {
          gold: '#D8A078',
          DEFAULT: '#D8A078',
        },
        blush: {
          DEFAULT: '#F4C7D0',
          deep: '#E7A6B6',
        },
        champagne: {
          DEFAULT: '#FFF0E5',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        hand: ['"Dancing Script"', 'cursive'],
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-120px) rotate(40deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.18)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.12)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scaleY(1)' },
          '50%': { opacity: '0.7', transform: 'scaleY(0.92)' },
        },
      },
      animation: {
        gradientShift: 'gradientShift 18s ease infinite',
        shimmer: 'shimmer 6s linear infinite',
        heartbeat: 'heartbeat 1.4s ease-in-out infinite',
        flicker: 'flicker 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
