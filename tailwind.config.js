/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#eef8f2',
          100: '#d7ece2',
          200: '#b3d9c7',
          300: '#84bfa4',
          400: '#4da17e',
          500: '#14805d',
          600: '#0f6f4f',
          700: '#0e5c41',
          800: '#10493a',
          900: '#0b3d2e',
          950: '#082b20',
        },
        ink: {
          400: '#77877f',
          500: '#54655d',
          700: '#22332c',
          900: '#10201a',
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
