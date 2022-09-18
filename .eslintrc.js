module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    'react',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: "module",
    allowImportExportEverywhere: true,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: ["@babel/plugin-proposal-class-properties"]
    },
  },
  extends: [
    'plugin:react/recommended',
  ],
  rules: {
    "react/prop-types": "off",
    "consistent-return": 2,
    "indent": [1, 2],
    "no-else-return": 1,
    "semi": [1, "always"],
    "space-unary-ops": 2,
  },
};
