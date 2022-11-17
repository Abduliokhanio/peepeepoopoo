/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    'react'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-env', '@babel/preset-react']
    },
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended'
  ],
  rules: {
    'react/no-children-prop': [0],
    'react/prop-types': 'off',
    'react/jsx-props-no-multi-spaces': [1],
    'consistent-return': 2,
    'no-unused-vars': 0,
    'indent': [1, 2],
    'no-else-return': 1,
    'semi': [1, 'always'],
    'space-unary-ops': 2,
    'no-unexpected-multiline': [1],
    'no-multiple-empty-lines': [1, {
      max: 1, maxEOF: 1
    }],
    'quotes': [2, 'single', {
      'avoidEscape': true
    }],
    'object-curly-newline': ['error', {
      'ObjectExpression': 'always',
      'ObjectPattern': {
        'multiline': true
      },
      'ExportDeclaration': {
        'multiline': true, 'minProperties': 3
      }
    }]
  },
};
