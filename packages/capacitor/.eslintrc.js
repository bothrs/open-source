module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: [
    '../../.eslintrc.js',
    '@bothrs/eslint-config-react',
    '@bothrs/eslint-config-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    "unused-imports/no-unused-imports": "off",
  }
}
