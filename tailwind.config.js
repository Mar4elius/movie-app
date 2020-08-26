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
        // 'custom-orange': '#73A1B0',
        // 'custom-white': '#ECF0F1',
        // 'custom-pink': '#FF7E57',
        // 'custom-grey': '#3C3642',
        // 'custom-dark-blue': '#87806D',
        'custom-orange': '#ED6A40',
        'custom-white': '#ECF0F1',
        'custom-pink': '#FCB7A8',
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
