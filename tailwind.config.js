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
        'dark-blue': '#0A4F70',
        'light-grey': '#F7F6F6',
        'sky-blue': '#51C5DD',
        'regular-grey': '#C6C4C4',
        'custom-pink': '#f04C63',
      },
    },
  },
  variants: {},
  plugins: [],
}
