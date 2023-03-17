module.exports = {
  extends: [
    '../../.eslintrc.js',
    '@bothrs/eslint-config-node',
    '@bothrs/eslint-config-typescript',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    "unused-imports/no-unused-imports": "off",
  }
}
