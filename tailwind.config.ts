export default {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2563eb',
          secondary: '#f97316',
          accent: '#10b981',
          neutral: '#f3f4f6',
          'base-100': '#ffffff',
          info: '#3b82f6',
          success: '#16a34a',
          warning: '#facc15',
          error: '#dc2626',
        },
      },
    ],
  },
  content: ['./src/**/*.html', './src/**/*.tsx'],
  plugins: [require('daisyui')],
};
