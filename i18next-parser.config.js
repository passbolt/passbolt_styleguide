module.exports = {
  keySeparator: false,
  namespaceSeparator: false,
  defaultNamespace: "common",
  createOldCatalogs: false,
  input: ["src/react-extension/**/*.{js,jsx}", "src/react-quickaccess/**/*.{js,jsx}", "src/react-web-integration/**/*.{js,jsx}", "src/shared/**/*.{js,jsx}"],
  output: "src/locales/$LOCALE/$NAMESPACE.json",
  sort: true,
  lexers: {
    js: [{
      lexer: 'JsxLexer',
      functions: ['t', 'translate'],
    }],
    jsx: [{
      lexer: 'JsxLexer',
      functions: ['t', 'translate'],
    }],
    default: ["JavascriptLexer"]
  },
  locales: ["en-UK"],
  useKeysAsDefaultValue: true,
};
