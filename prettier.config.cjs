/**
 * Prettier configuration
 * See: https://prettier.io/docs/en/options.html
 */
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.json', '*.yml', '*.yaml', '*.md'],
      options: { tabWidth: 2 },
    },
  ],
}
