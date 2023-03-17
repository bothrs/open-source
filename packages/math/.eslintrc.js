module.exports = {
  extends: [
    '../../.eslintrc.js'
  ],
  plugins: ["jest"],
  env: {
    "jest/globals": true
  },
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
