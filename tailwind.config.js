/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        flame: {
          50: '#fff8f5',
          100: '#ffeee8',
          200: '#ffd9cd',
          300: '#ffc3b1',
          400: '#eb9a80',
          500: '#e07657',
          600: '#c15235',
          700: '#a8442b',
          800: '#8a3722',
          900: '#5e2416',
          950: '#3d160c',
        },
        ink: {
          400: '#75675f',
          500: '#5b4d45',
          700: '#352820',
          900: '#211611',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(16deg)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        airWave: {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)' },
          '50%': { transform: 'translateX(12px) scaleX(1.08)' },
        },
      },
      animation: {
        floaty: 'floaty 5.5s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite',
        spinSlow: 'spinSlow 24s linear infinite',
        pulseRing: 'pulseRing 2.6s ease-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        marquee: 'marquee 26s linear infinite',
        airWave: 'airWave 4.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
