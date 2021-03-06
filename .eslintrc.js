module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'google'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'comma-dangle': ['error', 'never'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'semi-style': ['error', 'last'],
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { ignoreUrls: true, ignoreStrings: true }],
    quotes: [2, 'single', { avoidEscape: true }],
    'arrow-parens': 0
  }
};
