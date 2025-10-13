import {defineConfig} from "eslint/config";
import jest from "eslint-plugin-jest";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import {fileURLToPath} from "node:url";
import js from "@eslint/js";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([{
  extends: compat.extends("eslint:recommended", "plugin:react/recommended"),

  plugins: {
    jest,
    "no-unsanitized": noUnsanitized,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.amd,
      ...globals.webextensions,
      ...globals.jest,
      global: true,
      port: true,
    },

    parser: babelParser,
    ecmaVersion: 2020,
    sourceType: "module",

    parserOptions: {
      requireConfigFile: false,

      babelOptions: {
        presets: ["@babel/preset-react"],
      },
    },
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  rules: {
    strict: ["error", "never"],
    "no-console": 0,

    "no-empty": ["error", {
      allowEmptyCatch: true,
    }],

    curly: 2,
    "no-eval": 2,
    "no-extend-native": 2,
    "no-global-assign": 2,
    "no-implicit-coercion": 2,
    "no-implicit-globals": 2,
    "no-implied-eval": 2,
    "no-lone-blocks": 2,
    "no-useless-escape": 0,
    "array-bracket-spacing": 1,
    "block-spacing": 1,

    "brace-style": ["warn", "1tbs", {
      allowSingleLine: true,
    }],

    "comma-spacing": 1,
    "computed-property-spacing": 1,
    "eol-last": 1,
    "func-call-spacing": 1,

    "key-spacing": ["warn", {
      mode: "minimum",
    }],

    "keyword-spacing": 1,
    "linebreak-style": 1,
    "no-trailing-spaces": 1,
    "no-var": 1,
    "object-curly-spacing": ["warn", "never"],
    "padded-blocks": ["warn", "never"],
    semi: ["warn", "always"],
    "semi-spacing": 1,
    "space-before-blocks": 1,
    "space-before-function-paren": ["warn", "never"],
    "space-in-parens": ["warn", "never"],
    "space-infix-ops": 1,
    "arrow-body-style": ["warn", "as-needed"],
    "arrow-parens": ["warn", "as-needed"],
    "arrow-spacing": 1,
    "no-useless-constructor": 1,

    "prefer-arrow-callback": ["warn", {
      allowNamedFunctions: true,
    }],

    "prefer-template": 1,
    "template-curly-spacing": ["warn", "never"],
    "prefer-const": ["error"],
    "func-names": ["error", "never"],
    "multiline-comment-style": ["error", "starred-block"],

    "one-var": ["error", {
      initialized: "never",
      uninitialized: "always",
    }],

    indent: ["warn", 2, {
      MemberExpression: 1,
      SwitchCase: 1,
    }],

    "react/display-name": [0],
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",
  },
}]);
