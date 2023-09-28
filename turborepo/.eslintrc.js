module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
  },
};
