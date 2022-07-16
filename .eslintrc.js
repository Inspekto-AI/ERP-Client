const prettierOptions = require('./.prettierrc');

module.exports = {
  root: true,
  env: {
    jest: true,
    browser: true,
    node: true,
    es2020: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', './']
      }
    }
  },
  extends: ['airbnb', 'prettier', 'prettier/prettier'],
  plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y'],
  rules: {
    camelcase: 'off',
    'prettier/prettier': ['error', prettierOptions],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': 0,
    'react/prefer-stateless-function': 1,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': [2, { ignore: ['react', 'orion', 'prop-types'] }],
    'no-param-reassign': 0,
    'react/no-array-index-key': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'no-nested-ternary': 0,
    'react/forbid-prop-types': 0,
    'no-underscore-dangle': 0,
    'react/sort-comp': 0,
    'no-plusplus': 0,
    'max-classes-per-file': 0,
    'import/no-cycle': 0,
    'jsx-a11y/click-events-have-key-event': 0,
    'import/no-named-as-default': 0
  }
};
