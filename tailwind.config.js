module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A4D69', // rich indigo blue
        accent: '#63ACE5', // sky blue
        background: '#F7F9FC', // soft white
        text: '#1A1A1A', // primary text
        textSecondary: '#6E7A8A', // secondary text
        dark: '#1C1F26', // optional dark mode
        success: '#2ECC71',
        warning: '#F39C12',
        error: '#E74C3C',
        card: '#FFFFFF',
        border: '#E5E7EB',
        'secure-blue': '#1A4D8C',
        'secure-navy': '#1A1F36',
        'secure-emerald': '#10B981',
        // Landing page custom colors:
        navy: '#1A1F36',
        'slate-bg': '#23293d',
        'slate-surface': '#1a2233',
        gold: '#ffd580',
        teal: '#1de9b6',
        offwhite: '#f8fafc',
        // Used in gradients and backgrounds
        'slate-800': '#1e293b',
        'slate-900': '#0f172a',
        // Header/Footer specific
        'accent-gold': '#ffd580',
        'accent-teal': '#1de9b6',
        'dark-bg': '#1A1F36',
        'dark-surface': '#23293d',
        'text-main': '#f8fafc',
        'text-text-secondary': '#6E7A8A',
        // Add more if needed
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 2px 12px 0 rgba(42,77,105,0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}; 