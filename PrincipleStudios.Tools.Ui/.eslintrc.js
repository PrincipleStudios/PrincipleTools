module.exports = {
  "extends": [
    "next/core-web-vitals",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "prefer-const": "error"
  },
  ignorePatterns: ['/*.js*'],
};
