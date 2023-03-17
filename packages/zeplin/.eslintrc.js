module.exports = {
  env: {
    node: true,
    browser: true,
  },
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
    "import/extensions": ["error", "never"],
    "import/no-unresolved": "off"
  }
}
