module.exports = {
  "extends": [
    "next/core-web-vitals",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "prefer-const": "error",
    // disabled for static export
    "@next/next/no-img-element": 0
  },
  ignorePatterns: ['/*.js*'],
};
