module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Ensure it covers all your file extensions
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#3b82f6',
          secondary: '#f97316',
          accent: '#f59e0b',
          neutral: '#f3f4f6',
          'base-100': '#ffffff',
          info: '#3b82f6',
          success: '#10b981',
          warning: '#facc15',
          error: '#f87171',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
