/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.12.0
 */
const fs = require("fs");
const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const packageJson = require("../package.json");

const ROOT_DIR = path.resolve(__dirname, "..");
const COMMON_DIR = path.resolve(ROOT_DIR, "src/less/themes/common");
const THEMES = ["default", "midgar", "solarized_dark", "solarized_light", "sakura", "layette"];
// output name to body in src/less/themes/common; api_authentication is an alias of ext_authentication
const OUTPUTS = {
  api_main: "api_main",
  ext_app: "ext_app",
  ext_authentication: "ext_authentication",
  ext_quickaccess: "ext_quickaccess",
  ext_in_form_menu: "ext_in_form_menu",
  ext_in_form_cta: "ext_in_form_cta",
  api_authentication: "ext_authentication",
};
const DEFAULT_ONLY = ["ext_external"]; // self-contained body, no palette prepended
const LEGACY = {
  default: "colors.less",
  midgar: "colors_migdar.less",
  solarized_dark: "colors_solarized-dark.less",
  solarized_light: "colors_solarized-light.less",
  sakura: "colors.less",
  layette: "colors.less",
}; // until the legacy palettes are deleted

const buildLessEntries = () => {
  const entries = {};
  for (const theme of THEMES) {
    for (const [output, body] of Object.entries(OUTPUTS)) {
      // the query makes one module per theme and output; the loader reads the theme from it
      entries[`themes/${theme}/${output}`] =
        `${path.resolve(COMMON_DIR, `${body}.less`)}?theme=${theme}&output=${output}`;
    }
  }
  for (const output of DEFAULT_ONLY) {
    entries[`themes/default/${output}`] = path.resolve(COMMON_DIR, `${output}.less`);
  }
  return entries;
};

const banner =
  "/*!\n" +
  `* @name\t\t\t\t\t${packageJson.name}\n` +
  `* @version\t\t\tv${packageJson.version}\n` +
  `* @date\t\t\t\t\t${new Date().toISOString().split("T")[0]}\n` +
  `* @copyright\t\t${packageJson.copyright}\n` +
  `* @source\t\t\t\t${packageJson.repository}\n` +
  `* @license\t\t\t${packageJson.license}\n**/`;

// what the theme stubs used to import, in the same order
const themeImports = (theme) =>
  ["variables.less", `color_variables_${theme}.less`, `color_variables_${theme}.extra.less`, LEGACY[theme]]
    .map((file) => `@import "../../abstractions/${file}";\n`)
    .join("");

const lessRule = {
  test: /\.less$/,
  loader: "less-loader",
  type: "asset/resource",
  options: {
    additionalData: (content, loaderContext) => {
      const theme = new URLSearchParams(loaderContext.resourceQuery).get("theme");
      return `${banner}\n${theme ? themeImports(theme) : ""}${content}`;
    },
  },
  generator: {
    // the entry name is the output path: themes/<theme>/<output>
    filename: ({ module, chunkGraph }) => `css/${chunkGraph.getModuleChunks(module)[0].name}.min.css`,
  },
};

const lessMinimizer = new CssMinimizerPlugin();

// writes the theme list next to the compiled themes, for the consumers and the Storybook toolbar
const themesJsonPlugin = {
  apply: (compiler) =>
    compiler.hooks.afterEmit.tap("ThemesJsonPlugin", () =>
      fs.writeFileSync(path.join(compiler.outputPath, "css/themes/themes.json"), JSON.stringify(THEMES)),
    ),
};

module.exports = { buildLessEntries, lessRule, lessMinimizer, themesJsonPlugin };
