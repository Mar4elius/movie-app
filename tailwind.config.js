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
        'custom-orange': '#E74C3C',
        'custom-white': '#ECF0F1',
        'custom-blue': '#3498DB',
        'custom-grey': '#B5B5B7',
        'custom-dark-blue': '#2C3E50',
      },
    },
  },
  variants: {
    transition: ['hover'],
  },
  plugins: [],
}
