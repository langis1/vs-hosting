const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        black: '#12121A',
        white: '#FFFFFF',
        shadow: {
          100: '#E4E8FF',
          200: '#363A52',
          300: '#252837',
        },
        green: {
          100: '#00EEAB',
          200: '#1EBD90',
        },
        red: '#FF4057',
      },
    },
  },
  plugins: [],
};
