module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@bothrs/eslint-config'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  }
}
