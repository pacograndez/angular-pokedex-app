/** @type {import('tailwindcss').Config} */

const colors = require('./src/config/colors');
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ...colors
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: new RegExp(
        `(bg|to|shadow|)-(normal|fighting|flying|ground|poison|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy)`
      ),
      variants: ['hover']
    }
  ]
};
