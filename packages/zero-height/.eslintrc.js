module.exports = {
  env: {
    node: true,
    browser: true,
    "jest/globals": true
  },
  plugins: ["jest"],
  extends: [
    '../../.eslintrc.js'
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "import/extensions": ["error", "never"],
    "import/no-unresolved": "off"
  },
}
