module.exports = {
  extends: [
    '../../.eslintrc.js',
    '@bothrs/eslint-config-jest'
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    "import/extensions": ["error", "never"],
    "import/no-unresolved": "off"
  },
}
