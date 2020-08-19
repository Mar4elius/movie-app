module.exports = {
  purge: [
    'src/assets/**/*.js',
    'src/assets/**/*.jsx',
    'src/assets/**/*.ts',
    'src/assets/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange': '#F95700FF',
        'custom-yellow': '#EBCC72',
        'custom-blue': '#00A4CCFF',
        'custom-grey': '#E1DFDB',
        'custom-black': '#2A2728',
      },
    },
  },
  variants: {},
  plugins: [],
}
