module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb/hooks'],
  plugins: [
    '@typescript-eslint' // Let's us override rules below.
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // Required to have rules that rely on Types.
    tsconfigRootDir: './'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'import/no-unresolved': [1, { commonjs: true, amd: true }],
    "class-methods-use-this": "off",
    'no-dupe-class-members': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never'
      }
    ]
  }
}
