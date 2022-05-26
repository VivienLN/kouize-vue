module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      tiny: "1rem",
      small: "1.6rem",
      base: "2.4rem",
      xl: '3.3rem',
    },
    spacing: {
      '0': '0',
      '1': '.5rem',
      '2': '1rem',
      '3': '1.5rem',
      '4': '2rem',
      '5': '2.5rem',
      '6': '3rem',
      '7': '3.5rem',
      '8': '4rem',
      '9': '4.5rem',
      '10': '5rem',
      '11': '6.5rem',
      '12': '6rem',
      '13': '6.5rem',
    },
    borderRadius: {
      'md': '0.75rem',
      'xl': '1.5rem',
      DEFAULT: '.4rem',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0px',
      2: '2px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|border|text)-[a-z-]+-[0-9]+/,
      variants: ['hover', 'focus', 'active'],
    },
  ],
}
  