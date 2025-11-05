module.exports = {
  root: true,
  extends: ['next', 'airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: ['./apps/web/tsconfig.json']
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-void': ['error', { allowAsStatement: true }]
  }
};
