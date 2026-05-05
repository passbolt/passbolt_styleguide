const { defineConfig } = require("i18next-cli");

module.exports = defineConfig({
  locales: ["en-UK"],
  extract: {
    input: [
      "src/react-extension/**/*.{js,jsx}",
      "src/react-quickaccess/**/*.{js,jsx}",
      "src/react-web-integration/**/*.{js,jsx}",
      "src/shared/**/*.{js,jsx}",
    ],
    output: "src/locales/{{language}}/{{namespace}}.json",
    defaultNS: "common",
    keySeparator: false,
    nsSeparator: false,
    functions: ["t", "translate", "*.t", "*.translate"],
    transComponents: ["Trans"],
    warnOnConflicts: true,
    removeUnusedKeys: false,
    transKeepBasicHtmlNodesFor: ["br"],
  },
});
