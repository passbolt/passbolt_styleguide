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
const THEMES = ["default", "midgar", "solarized_dark", "solarized_light"];

const buildLessEntries = () => {
  const rootThemesPath = path.resolve(ROOT_DIR, "src/less/themes");

  const themeEntries = THEMES.reduce((acc, themeFolder) => {
    const themePath = path.resolve(rootThemesPath, themeFolder);

    const lessFiles = fs.readdirSync(themePath, { withFileTypes: true });
    for (const file of lessFiles) {
      if (file.isFile() && file.name.endsWith(".less")) {
        const fullPath = path.resolve(file.parentPath, file.name);
        acc[fullPath] = fullPath;
      }
    }

    return acc;
  }, {});

  return {
    publicLess: path.resolve(ROOT_DIR, "src/less/public.less"),
    helpLess: path.resolve(ROOT_DIR, "src/less/help.less"),
    ...themeEntries,
  };
};

const lessRule = {
  test: /\.less$/,
  loader: "less-loader",
  type: "asset/resource",
  options: {
    additionalData:
      "/*!\n" +
      `* @name\t\t\t\t\t${packageJson.name}\n` +
      `* @version\t\t\tv${packageJson.version}\n` +
      `* @date\t\t\t\t\t${new Date().toISOString().split("T")[0]}\n` +
      `* @copyright\t\t${packageJson.copyright}\n` +
      `* @source\t\t\t\t${packageJson.repository}\n` +
      `* @license\t\t\t${packageJson.license}\n**/`,
  },
  generator: {
    filename: ({ filename }) => filename.replace(/^src\/less\//, "css/").replace(/\.less$/, ".min.css"),
  },
};

const lessMinimizer = new CssMinimizerPlugin();

module.exports = { buildLessEntries, lessRule, lessMinimizer };
