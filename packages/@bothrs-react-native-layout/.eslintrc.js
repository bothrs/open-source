module.exports = { 
  extends: [
    '../../.eslintrc.js',
    '@bothrs/eslint-config/react',
    '@bothrs/eslint-config/react-native',
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
