/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2026 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2026 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.19.0
 */
import fs from "fs";
import path from "path";

const LESS_DIR = path.resolve(__dirname, "..");
const DEFINITION = /(?:^|[{;])\s*(--[\w-]+)\s*:/gm; // a custom property declaration
const USAGE = /var\(\s*(--[\w-]+)/g;
// tokens present in some palettes only; WP6 re-exports the six palettes from Figma and empties this list
const ALLOWED_DRIFT = [
  // only in default, midgar, solarized_dark and solarized_light
  "--Healthcheck-Healthcheck-Success-icon",
  "--Healthcheck-Healthcheck-Warning-icon",
  "--Healthcheck-Healthcheck-Error-icon",
  "--Healthcheck-Healthcheck-Info-icon",
  // only in sakura and layette
  "--Badges-Alert-background",
  "--Badges-Success-background",
  "--Badges-Error-background",
  "--Badges-Loader-background",
  "--Badges-Loader-stroke",
  "--Badges-Bagde-icon",
  "--Icon-Color-01",
  "--Icon-Color-02",
  "--Icon-Color-03",
  "--Icon-Color-04",
  "--Icon-Color-05",
  "--Icon-Color-06",
  "--Icon-Color-07",
  "--Icon-Color-08",
  "--Icon-Color-09",
  "--Icon-Color-10",
  "--Icon-Color-11",
  "--Icon-Color-12",
  "--Icon-Color-13",
  "--Icon-Color-14",
  "--Secret-history-Diff",
  "--Onboarding-Background",
  "--Onboarding-Border",
  "--Onboarding-Resource-and-Data-Creation",
  "--Onboarding-Account-and-Security-Settings",
  "--Onboarding-User-Onboarding-and-Collaboration",
  "--Onboarding-System-Validation",
  "--User-drag-n-drop-padding",
];

const read = (file) => fs.readFileSync(file, "utf8");
const names = (content, regex) => Array.from(content.matchAll(regex), (match) => match[1]);
const lessFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return lessFiles(file);
    }
    return file.endsWith(".less") ? [file] : [];
  });

// a theme is a color_variables_<theme>.less beside this test; its tokens are the palette plus the extra file
const themes = fs
  .readdirSync(__dirname)
  .map((file) => /^color_variables_(\w+)\.less$/.exec(file)?.[1])
  .filter(Boolean);
const tokensOf = (theme) => {
  const palette = read(path.join(__dirname, `color_variables_${theme}.less`));
  const extra = read(path.join(__dirname, `color_variables_${theme}.extra.less`));
  return new Set(names(palette + extra, DEFINITION));
};
const palettes = new Map(themes.map((theme) => [theme, tokensOf(theme)]));
const allTokens = new Set(Array.from(palettes.values()).flatMap((tokens) => Array.from(tokens)));

describe("colorVariables", () => {
  it.each(themes)("should define in the %s palette every token another palette defines", (theme) => {
    expect.assertions(1);
    const missing = Array.from(allTokens).filter(
      (token) => !palettes.get(theme).has(token) && !ALLOWED_DRIFT.includes(token),
    );
    expect(missing).toEqual([]);
  });

  it("should define every var() used under src/less in the palettes or in the same file", () => {
    expect.assertions(1);
    const undefinedUsages = lessFiles(LESS_DIR)
      .filter((file) => path.dirname(file) !== __dirname)
      .flatMap((file) => {
        const content = read(file);
        const local = new Set(names(content, DEFINITION));
        return Array.from(new Set(names(content, USAGE)))
          .filter((token) => !allTokens.has(token) && !local.has(token))
          .map((token) => `${token} in ${path.relative(LESS_DIR, file)}`);
      });
    expect(undefinedUsages).toEqual([]);
  });
});
