module.exports = {
  extends: [
    '../../.eslintrc.js',
    '@bothrs/eslint-config-typescript',
    '@bothrs/eslint-config-react-native',
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
    "unused-imports/no-unused-imports": "off",
  }
}
