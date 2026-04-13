/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          bg:      '#000000',
          surface: '#111111',
          card:    '#1a1a1a',
          dark:    '#050505',
        },
        accent: {
          gold:      '#D4AF37',   // Metallic Gold
          light:     '#F5E6BE',   // Soft Cream/Gold
          bright:    '#FFD700',   // Vibrant Gold
          bronze:    '#A67C00',   // Dark Bronze/Gold
        },
        brand: {
          text:  '#D4AF37',       // Gold text by default
          muted: '#8A7139',       // Muted gold/bronze
          border:'rgba(212,175,55,0.3)',
        }
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
        playfair:['"Playfair Display"', 'serif'],
      },

      backgroundImage: {
        'crimson-gradient': 'linear-gradient(135deg, #1a0008 0%, #2a000e 40%, #1a0010 70%, #120008 100%)',
        'accent-gradient':  'linear-gradient(135deg, #c4006a, #590054)',
        'card-gradient':    'linear-gradient(135deg, rgba(50,0,18,0.9), rgba(70,0,40,0.8))',
      },
      animation: {
        'fade-in':   'fadeIn 0.5s ease-out',
        'slide-up':  'slideUp 0.6s ease-out',
        'glow-pulse':'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(196,0,106,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(196,0,106,0.6)' },
        },
      },
      boxShadow: {
        'crimson':     '0 4px 30px rgba(196,0,106,0.25)',
        'crimson-lg':  '0 8px 50px rgba(196,0,106,0.35)',
        'purple':      '0 4px 30px rgba(89,0,84,0.3)',
      },
    },
  },
  plugins: [],
}
