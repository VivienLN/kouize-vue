module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|border|text)-[a-z-]+-[0-9]+/,
      variants: ['hover', 'focus', 'active'],
    },
  ],
}
