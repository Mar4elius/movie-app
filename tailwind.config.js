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
        'custom-white': '#ECF0F1',
        'custom-blue': '#00A4CCFF',
        'custom-grey': '#758086',
        'custom-dark-blue': '#2B4448',
      },
    },
  },
  variants: {
    transition: ['hover'],
  },
  plugins: [],
}
