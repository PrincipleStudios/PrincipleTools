/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    "next": {
      "rootDir": __dirname
    }
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "prefer-const": "error",
    // disabled for static export
    "@next/next/no-img-element": 0,
    "@next/next/no-html-link-for-pages": ["error", "./src/pages"]
  },
  ignorePatterns: ['/*.js*'],
};
