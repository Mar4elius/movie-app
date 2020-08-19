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
        'custom-orange': '#F99227',
        'custom-yellow': '#EBCC72',
        'custom-blue': '#2B85BE',
        'custom-grey': '#E1DFDB',
        'custom-black': '#2A2728',
      },
    },
  },
  variants: {
    'text-lg': ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
